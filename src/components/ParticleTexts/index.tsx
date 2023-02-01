import * as THREE from "three";
import type { Font as ThreeFont } from "three/examples/jsm/loaders/FontLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Environment from "./particleEngine";

export interface ParticleTextProps {
  text: string;
}

export const ParticleText = ({ text }: ParticleTextProps) => {
  const containerRef = (ref: HTMLDivElement) => {
    const manager = new THREE.LoadingManager();

    let fontFamily: ThreeFont | null = null;
    new FontLoader(manager).load(
      "/assets/fonts/PoiretOne_Regular.json",
      (responseFont) => {
        fontFamily = responseFont;
      }
    );

    const particle = new THREE.TextureLoader(manager).load(
      "/assets/images/particle.png"
    );

    manager.onLoad = () => {
      if (fontFamily !== null)
        new Environment(fontFamily!, particle, text, ref);
    };
  };

  return <div className="h-full w-full" ref={containerRef} />;
};

export default ParticleText;
