import { useEffect, useRef } from "react";

import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Title } from "@mantine/core";

import VanillaTilt from "vanilla-tilt";

interface CellProps {
  logo: StaticImageData;
  label: string;
  className?: string;
}

export const SkillCell = ({ logo, label, className = "" }: CellProps) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tiltRef.current &&
      VanillaTilt.init(tiltRef.current, {
        max: 20,
        speed: 100,
        glare: true,
        "max-glare": 0.3,
      });
  }, []);

  return (
    <div
      className="grid w-full place-content-center rounded-2xl p-2 py-4"
      ref={tiltRef}
    >
      <div
        className={
          "grid h-[120px] w-[120px] place-content-center rounded-lg bg-gray-100/70 p-2 backdrop-blur-lg " +
          className
        }
      >
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={150}
          className="drop-shadow-lg"
        />
      </div>
      <Title order={3} className="pt-2 text-center">
        {label}
      </Title>
    </div>
  );
};

export default SkillCell;
