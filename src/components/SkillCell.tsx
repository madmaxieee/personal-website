import { useEffect, useRef } from 'react';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import VanillaTilt from 'vanilla-tilt';

import { Title } from '@mantine/core';

import { cn } from '@/utils/cn';

interface CellProps {
  logo: StaticImageData;
  label: string;
  className?: string;
}

export const SkillCell = ({ logo, label, className = '' }: CellProps) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tiltRef.current &&
      VanillaTilt.init(tiltRef.current, {
        max: 20,
        speed: 100,
        glare: true,
        'max-glare': 0.3,
        easing: 'cubic-bezier(.03,.98,.52,.99)',
      });
  }, []);

  return (
    <div
      className="grid w-full place-content-center rounded-2xl p-2 py-4 max-md:py-2"
      ref={tiltRef}
    >
      <div
        className={cn(
          'grid h-[120px] w-[120px] place-content-center rounded-lg bg-gray-100/30 p-4 backdrop-blur-lg',
          'max-md:h-24 max-md:w-24',
          className
        )}
      >
        <Image
          src={logo}
          alt={`${label} logo`}
          width={150}
          height={150}
          priority={true}
        />
      </div>
      <Title order={3} className="pt-2 text-center max-md:text-lg">
        {label}
      </Title>
    </div>
  );
};

export default SkillCell;
