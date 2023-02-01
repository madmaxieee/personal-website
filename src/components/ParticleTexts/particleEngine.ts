import * as THREE from "three";
import type { Font as ThreeFont } from "three/examples/jsm/loaders/FontLoader";

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

const random = (num: number, range = 1, seed = "hash") => {
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
    window.addEventListener("resize", this.onWindowResize.bind(this));
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

const bgParticleColor: [number, number, number] = [0.7, 0.7, 0.6];

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
  data: {
    text: string;
    amount: number;
    particleSize: number;
    particleColor: number;
    textSize: number;
    area: number;
    ease: number;
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
    this.data = {
      text: this.text,
      amount: 600,
      particleSize: 1.5,
      particleColor: 0xffffff,
      textSize: 24,
      area: 50,
      ease: 0.05,
    };

    this.colorChange = new THREE.Color();

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
    document.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  onMouseDown(event: MouseEvent) {
    // prevent right key
    if (event.buttons === 2) return;

    const vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    vector.unproject(this.camera);
    this.bottom = true;
    this.data.ease = 0.01;
  }

  onMouseUp() {
    this.bottom = false;
    this.data.ease = 0.05;
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
    const copy = this.geometryCopy.attributes.position as THREE.BufferAttribute;
    const colors = this.particles.geometry.attributes
      .customColor as THREE.BufferAttribute;
    const size = this.particles.geometry.attributes
      .size as THREE.BufferAttribute;

    const newSizeArray: number[] = [];
    for (let i = 0; i < size.array.length; i++) {
      newSizeArray.push(size.array[i]!);
    }

    const mx = intersects[0]?.point.x ?? 0;
    const my = intersects[0]?.point.y ?? 0;

    if (!this.exploded) {
      for (let i = 0, l = pos.count; i < l; i++) {
        const explodeRange = 100;
        const posX =
          (copy.getX(i) as number) +
          (THREE.MathUtils.randFloatSpread(explodeRange) as number);
        const posY =
          (copy.getY(i) as number) +
          (THREE.MathUtils.randFloatSpread(explodeRange) as number);
        const posZ =
          copy.getZ(i) + THREE.MathUtils.randFloatSpread(explodeRange);

        pos.setXYZ(i, posX, posY, posZ);
      }
      this.exploded = true;
    }

    for (let i = 0, l = pos.count; i < l; i++) {
      const initX = copy.getX(i);
      const initY = copy.getY(i);
      const initZ = copy.getZ(i);

      let px = pos.getX(i);
      let py = pos.getY(i);
      let pz = pos.getZ(i);

      this.colorChange.setHSL(0.5, 1, 1);
      colors.setXYZ(
        i,
        this.colorChange.r,
        this.colorChange.g,
        this.colorChange.b
      );
      colors.needsUpdate = true;

      newSizeArray[i] = this.data.particleSize;
      size.needsUpdate = true;

      let dy = my - py;
      let dx = mx - px;

      const mouseDistance = this.distance(mx, my, px, py);
      const d = (dx = mx - px) * dx + (dy = my - py) * dy;
      const f = -this.data.area / d;

      if (this.bottom) {
        const t = Math.atan2(dy, dx);
        px -= f * Math.cos(t);
        py -= f * Math.sin(t);

        this.colorChange.setHSL(...bgParticleColor);
        colors.setXYZ(
          i,
          this.colorChange.r,
          this.colorChange.g,
          this.colorChange.b
        );
        colors.needsUpdate = true;

        if (
          px > initX + 70 ||
          px < initX - 70 ||
          py > initY + 70 ||
          py < initY - 70
        ) {
          this.colorChange.setHSL(...bgParticleColor);
          colors.setXYZ(
            i,
            this.colorChange.r,
            this.colorChange.g,
            this.colorChange.b
          );
          colors.needsUpdate = true;
        }
      } else {
        if (mouseDistance < this.data.area) {
          if (i % 5 === 0) {
            const t = Math.atan2(dy, dx);
            px -= 0.03 * Math.cos(t);
            py -= 0.03 * Math.sin(t);

            this.colorChange.setHSL(...bgParticleColor);
            colors.setXYZ(
              i,
              this.colorChange.r,
              this.colorChange.g,
              this.colorChange.b
            );
            colors.needsUpdate = true;

            newSizeArray[i] = this.data.particleSize / 1.2;
            size.needsUpdate = true;
          } else {
            const t = Math.atan2(dy, dx);
            px += f * Math.cos(t);
            py += f * Math.sin(t);

            pos.setXYZ(i, px, py, pz);
            pos.needsUpdate = true;

            newSizeArray[i] = this.data.particleSize * 1.3;
            size.needsUpdate = true;
          }

          if (
            px > initX + 10 ||
            px < initX - 10 ||
            py > initY + 10 ||
            py < initY - 10
          ) {
            this.colorChange.setHSL(...bgParticleColor);
            colors.setXYZ(
              i,
              this.colorChange.r,
              this.colorChange.g,
              this.colorChange.b
            );
            colors.needsUpdate = true;

            newSizeArray[i] = this.data.particleSize / 1.8;
            size.needsUpdate = true;
          }
        }
      }

      px += (initX - px) * this.data.ease;
      py += (initY - py) * this.data.ease;
      pz += (initZ - pz) * this.data.ease;

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
      }

      pos.setXYZ(i, px, py, pz);
      pos.needsUpdate = true;
    }

    size.copyArray(newSizeArray);
  }

  createText() {
    const thePoints: THREE.Vector3[] = [];

    const shapes = this.font.generateShapes(this.data.text, this.data.textSize);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid = geometry.boundingBox
      ? -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
      : 0;
    const yMid =
      geometry.boundingBox &&
      (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 3;

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
      const points = shape.getSpacedPoints(this.data.amount);

      points.forEach((element) => {
        const a = new THREE.Vector3(
          element.x + getSpread(),
          element.y + getSpread(),
          0
        );
        thePoints.push(a);
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push(1);
      });
    }

    for (const hole of holePaths) {
      const points = hole.getSpacedPoints(this.data.amount / 2);

      points.forEach((element) => {
        const a = new THREE.Vector3(
          element.x + getSpread(),
          element.y + getSpread(),
          0
        );
        thePoints.push(a);
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push(1);
      });
    }

    const geoParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
    geoParticles.translate(xMid, yMid as number, 0);

    geoParticles.setAttribute(
      "customColor",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geoParticles.setAttribute(
      "size",
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
