import { useRef, useLayoutEffect } from 'react';

import type { ClassValue } from 'clsx';
import * as THREE from 'three';
import type { Font as ThreeFont } from 'three/examples/jsm/loaders/FontLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import Environment from './particleEngine';
import { cn } from '@/utils/cn';

export interface ParticleTextProps {
  text: string;
  isMobile?: boolean;
  className?: ClassValue;
}

export const ParticleText = ({
  text,
  className,
  isMobile,
}: ParticleTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    let env: Environment;

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

    const mobileConfig = {
      fontSize: 10,
      amount: 300,
      particleSize: 0.7,
      radiusScale: 0.2,
    };

    const desktopConfig = {
      fontSize: 24,
      amount: 600,
      particleSize: 1.5,
      radiusScale: 1,
    };

    manager.onLoad = () => {
      if (fontFamily !== null)
        env = new Environment({
          font: fontFamily!,
          texture: particle,
          text: text,
          container: containerRef.current!,
          ...(isMobile ? mobileConfig : desktopConfig),
        });
    };

    return () => {
      manager.onLoad = () => {
        return;
      };
      env?.destroy();
    };
  }, [containerRef, text, isMobile]);

  return <div className={cn('h-full w-full', className)} ref={containerRef} />;
};

export default ParticleText;
