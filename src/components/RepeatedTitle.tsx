import { Title } from "@mantine/core";

import clsx from "clsx";

export interface RepeatedTitleProps {
  className?: string;
  title: string;
  colorClasses: string[];
  size?:
    | "giant"
    | "xl"
    | "lg"
    | "md"
    | "sm"
    | "xs"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
}

export const RepeatedTitle = ({
  title,
  colorClasses,
  className,
  size,
}: RepeatedTitleProps) => {
  return (
    <div className={className}>
      <Title
        className={clsx(
          "whitespace-nowrap py-12 text-vertical",
          `text-${size ?? "giant"}`
        )}
      >
        {colorClasses.map((colorClass, index) => (
          <span key={index} className={colorClass}>{`${title}. `}</span>
        ))}
      </Title>
    </div>
  );
};

export default RepeatedTitle;
