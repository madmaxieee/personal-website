import { Title } from "@mantine/core";

export interface RepeatedTitleProps {
  className?: string;
  title: string;
  colorClasses: string[];
}

export const RepeatedTitle = ({
  title,
  colorClasses,
  className,
}: RepeatedTitleProps) => {
  return (
    <div className={className}>
      <Title className="whitespace-nowrap py-12 text-giant text-vertical">
        {colorClasses.map((colorClass, index) => (
          <span key={index} className={colorClass}>{`${title}. `}</span>
        ))}
      </Title>
    </div>
  );
};

export default RepeatedTitle;
