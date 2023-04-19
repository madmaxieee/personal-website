import { useRef, useLayoutEffect } from 'react';

import * as THREE from 'three';
import type { Font as ThreeFont } from 'three/examples/jsm/loaders/FontLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import Environment from './particleEngine';

export interface ParticleTextProps {
  text: string;
}

export const ParticleText = ({ text }: ParticleTextProps) => {
  const containerRef = useRef(null!);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const manager = new THREE.LoadingManager();

    let fontFamily: ThreeFont | null = null;
    new FontLoader(manager).load(
      '/assets/fonts/PoiretOne_Regular.json',
      (responseFont) => {
        fontFamily = responseFont;
      }
    );

    const particle = new THREE.TextureLoader(manager).load(
      '/assets/images/particle.png'
    );

    manager.onLoad = () => {
      if (fontFamily !== null)
        new Environment(fontFamily!, particle, text, containerRef.current);
    };
  }, [containerRef, text]);

  return <div className="h-full w-full" ref={containerRef} />;
};

export default ParticleText;
