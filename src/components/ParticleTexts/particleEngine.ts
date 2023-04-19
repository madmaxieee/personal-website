import * as THREE from 'three';
import type { Font as ThreeFont } from 'three/examples/jsm/loaders/FontLoader';

const cyrb53 = function (str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const random = (num: number, range = 1, seed = 'hash') => {
  const rand = (cyrb53(seed, num) % 1_000_000) / 1_000_000;
  if (range === 1) return rand;
  return Math.round(rand * range);
};

export default class Environment {
  particle: THREE.Texture;
  font: ThreeFont;
  text: string;
  container: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  createParticles: CreateParticles;
  renderer: THREE.WebGLRenderer;

  constructor(
    font: ThreeFont,
    particle: THREE.Texture,
    text: string,
    container: HTMLElement
  ) {
    this.font = font;
    this.text = text;
    this.particle = particle;
    this.container = container;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      65,
      this.container.clientWidth / this.container.clientHeight,
      1,
      10000
    );
    this.camera.position.set(0, 0, 100);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild(this.renderer.domElement);

    this.renderer.setAnimationLoop(() => {
      this.render();
    });

    this.createParticles = new CreateParticles(
      this.scene,
      this.font,
      this.particle,
      this.camera,
      this.renderer,
      this.text
    );

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  render() {
    this.createParticles.render();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
    }
  }
}

const bgParticleColorHSL: [number, number, number] = [0, 0.73, 0.53];
const foregroundColorHSL: [number, number, number] = [0, 1, 1];

class CreateParticles {
  scene: THREE.Scene;
  font: ThreeFont;
  particleImg: THREE.Texture;
  text: string;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  container: HTMLElement;
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  colorChange: THREE.Color;
  bottom: boolean;
  attribute: {
    amount: number;
    particleSize: number;
    particleColor: number;
    textSize: number;
    force: number;
    ease: number;
    radius1: number;
    radius2: number;
    radius3: number;
    bgParticleColorHSL: [number, number, number];
    foregroundColorHSL: [number, number, number];
  };
  exploded = false;
  planeArea: THREE.Mesh;
  currentPosition?: THREE.Vector3;
  particles: THREE.Points;
  geometryCopy: THREE.BufferGeometry;

  constructor(
    scene: THREE.Scene,
    font: ThreeFont,
    particleImg: THREE.Texture,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    text: string
  ) {
    this.scene = scene;
    this.font = font;
    this.text = text;
    this.particleImg = particleImg;
    this.camera = camera;
    this.renderer = renderer;
    this.container = renderer.domElement;

    this.raycaster = new THREE.Raycaster();

    this.mouse = new THREE.Vector2(100, 100);
    this.attribute = {
      amount: 600,
      particleSize: 1.5,
      particleColor: 0xffffff,
      textSize: 24,
      force: 50,
      ease: 0.05,
      radius1: 50,
      radius2: 70,
      radius3: 10,
      bgParticleColorHSL: [0, 0.73, 0.53],
      foregroundColorHSL: [0, 1, 1],
    };

    this.colorChange = new THREE.Color();
    this.colorChange.setHSL(...foregroundColorHSL);

    this.bottom = false;

    const geometry = new THREE.PlaneGeometry(
      this.visibleWidthAtZDepth(100, this.camera),
      this.visibleHeightAtZDepth(100, this.camera)
    );
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
    });
    this.planeArea = new THREE.Mesh(geometry, material);
    this.planeArea.visible = false;

    this.particles = new THREE.Points();
    this.geometryCopy = new THREE.BufferGeometry();

    this.createText();
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseDown(event: MouseEvent) {
    // prevent right key
    if (event.buttons === 2) return;

    const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    vector.unproject(this.camera);
    this.bottom = true;
    this.attribute.ease = 0.01;
  }

  onMouseUp() {
    this.bottom = false;
    this.attribute.ease = 0.05;
  }

  onMouseMove(event: MouseEvent) {
    const rendererSize = this.renderer.getSize(new THREE.Vector2(0, 0));
    const boundingBox = this.container.getBoundingClientRect();
    this.mouse.x = ((event.clientX - boundingBox.x) / rendererSize.x) * 2 - 1;
    this.mouse.y = -((event.clientY - boundingBox.y) / rendererSize.y) * 2 + 1;
  }

  render() {
    const time = Math.round(performance.now());

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObject(this.planeArea);

    const pos = this.particles.geometry.attributes
      .position as THREE.BufferAttribute;
    const originalPos = this.geometryCopy.attributes
      .position as THREE.BufferAttribute;
    const colors = this.particles.geometry.attributes
      .customColor as THREE.BufferAttribute;
    const size = this.particles.geometry.attributes
      .size as THREE.BufferAttribute;

    const mx = intersects[0]?.point.x ?? 0;
    const my = intersects[0]?.point.y ?? 0;

    if (!this.exploded) {
      for (let i = 0, l = pos.count; i < l; i++) {
        const explodeRange = 100;
        const posX =
          originalPos.getX(i) + THREE.MathUtils.randFloatSpread(explodeRange);
        const posY =
          originalPos.getY(i) + THREE.MathUtils.randFloatSpread(explodeRange);
        const posZ =
          originalPos.getZ(i) + THREE.MathUtils.randFloatSpread(explodeRange);

        pos.setXYZ(i, posX, posY, posZ);
      }
      this.exploded = true;
    }

    for (let i = 0, l = pos.count; i < l; i++) {
      const initX = originalPos.getX(i);
      const initY = originalPos.getY(i);
      const initZ = originalPos.getZ(i);

      let px = pos.getX(i);
      let py = pos.getY(i);
      let pz = pos.getZ(i);

      this.colorChange.setHSL(...foregroundColorHSL);
      colors.setXYZ(
        i,
        this.colorChange.r,
        this.colorChange.g,
        this.colorChange.b
      );
      colors.needsUpdate = true;

      size.setX(i, this.attribute.particleSize);
      size.needsUpdate = true;

      const dy = my - py;
      const dx = mx - px;

      const mouseDistance = this.distance(mx, my, px, py);
      const d2 = dx * dx + dy * dy;
      const f = -this.attribute.force / d2;

      if (this.bottom) {
        const t = Math.atan2(dy, dx);
        px -= f * Math.cos(t);
        py -= f * Math.sin(t);

        this.colorChange.setHSL(...bgParticleColorHSL);
        colors.setXYZ(
          i,
          this.colorChange.r,
          this.colorChange.g,
          this.colorChange.b
        );
        colors.needsUpdate = true;

        if (
          Math.abs(px - initX) > this.attribute.radius2 ||
          Math.abs(py - initY) > this.attribute.radius2
        ) {
          this.colorChange.setHSL(...bgParticleColorHSL);
          colors.setXYZ(
            i,
            this.colorChange.r,
            this.colorChange.g,
            this.colorChange.b
          );
          colors.needsUpdate = true;
        }
      } else {
        if (mouseDistance < this.attribute.radius1) {
          if (i % 5 === 0) {
            const t = Math.atan2(dy, dx);
            px -= 0.03 * Math.cos(t);
            py -= 0.03 * Math.sin(t);

            this.colorChange.setHSL(...bgParticleColorHSL);
            colors.setXYZ(
              i,
              this.colorChange.r,
              this.colorChange.g,
              this.colorChange.b
            );
            colors.needsUpdate = true;

            size.setX(i, this.attribute.particleSize / 1.2);
            size.needsUpdate = true;
          } else {
            const t = Math.atan2(dy, dx);
            px += f * Math.cos(t);
            py += f * Math.sin(t);

            pos.setXYZ(i, px, py, pz);
            pos.needsUpdate = true;

            size.setX(i, this.attribute.particleSize * 1.3);
            size.needsUpdate = true;
          }

          if (
            Math.abs(px - initX) > this.attribute.radius3 ||
            Math.abs(py - initY) > this.attribute.radius3
          ) {
            this.colorChange.setHSL(...bgParticleColorHSL);
            colors.setXYZ(
              i,
              this.colorChange.r,
              this.colorChange.g,
              this.colorChange.b
            );
            colors.needsUpdate = true;

            size.setX(i, this.attribute.particleSize / 1.8);
            size.needsUpdate = true;
          }
        }
      }

      px += (initX - px) * this.attribute.ease;
      py += (initY - py) * this.attribute.ease;
      pz += (initZ - pz) * this.attribute.ease;

      // add random movement to the particles
      const interval = 1000;
      const freq = 20;
      const t = Math.round((time + random(i, interval)) / interval);
      if ((t + i) % freq === random(t, freq)) {
        const amp = 0.1;
        const linear = 1 - (time % interval) / interval;

        px += amp * (random(i * t + 1) - 0.5) * linear;
        py += amp * (random(i + t * 2) - 0.5) * linear;
        pz += amp * (random(i ^ (t * 3)) - 0.5) * linear;

        size.setX(i, this.attribute.particleSize * 1.3);
      }

      pos.setXYZ(i, px, py, pz);
      pos.needsUpdate = true;
    }
  }

  createText() {
    const thePoints: THREE.Vector3[] = [];

    const shapes = this.font.generateShapes(this.text, this.attribute.textSize);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid = geometry.boundingBox
      ? -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
      : 0;
    const yMid = geometry.boundingBox
      ? (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 3
      : 0;

    geometry.center();

    const holePaths: THREE.Path[] = [];

    for (const shape of shapes) {
      for (const hole of shape.holes) {
        holePaths.push(hole);
      }
    }

    const colors: number[] = [];
    const sizes: number[] = [];

    const getSpread = () =>
      (THREE.MathUtils.randFloatSpread(1) *
        2 ** THREE.MathUtils.randFloat(1, 10)) /
        200 +
      THREE.MathUtils.randFloatSpread(0.7);

    for (const shape of shapes) {
      const points = shape.getSpacedPoints(this.attribute.amount);

      points.forEach((element) => {
        const point = new THREE.Vector3(
          element.x + getSpread(),
          element.y + getSpread(),
          0
        );
        thePoints.push(point);
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push(1);
      });
    }

    for (const hole of holePaths) {
      const points = hole.getSpacedPoints(this.attribute.amount / 2);

      points.forEach((element) => {
        const point = new THREE.Vector3(
          element.x + getSpread(),
          element.y + getSpread(),
          0
        );
        thePoints.push(point);
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push(1);
      });
    }

    // get random points
    const distance = 300;
    for (let i = 0; i < this.attribute.amount * 1.5; i++) {
      const point = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(1) * distance - xMid,
        THREE.MathUtils.randFloatSpread(1) * distance - yMid,
        0
      );
      thePoints.push(point);
      colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
      sizes.push(3);
    }

    const geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
    geoParticles.translate(xMid, yMid, 0);

    geoParticles.setAttribute(
      'customColor',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geoParticles.setAttribute(
      'size',
      new THREE.Float32BufferAttribute(sizes, 1)
    );

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        pointTexture: { value: this.particleImg },
      },
      vertexShader: `attribute float size;
            attribute vec3 customColor;
            varying vec3 vColor;

            void main() {

              vColor = customColor;
              vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
              gl_PointSize = size * ( 300.0 / -mvPosition.z );
              gl_Position = projectionMatrix * mvPosition;

            }`,
      fragmentShader: `uniform vec3 color;
            uniform sampler2D pointTexture;

            varying vec3 vColor;

            void main() {

              gl_FragColor = vec4( color * vColor, 1.0 );
              gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

            }`,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    this.particles = new THREE.Points(geoParticles, material);
    this.scene.add(this.particles);

    this.geometryCopy = new THREE.BufferGeometry();
    this.geometryCopy.copy(this.particles.geometry);
  }

  visibleHeightAtZDepth(depth: number, camera: THREE.PerspectiveCamera) {
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    const vFOV = (camera.fov * Math.PI) / 180;

    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  visibleWidthAtZDepth(depth: number, camera: THREE.PerspectiveCamera) {
    const height = this.visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
  }

  distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}
