import clsx, { ClassValue } from 'clsx';

import { Title } from '@mantine/core';

import { cn } from '@/utils/cn';

export interface RepeatedTitleProps {
  title: string;
  colorClasses: string[];
  className?: ClassValue;
  textClassName?: ClassValue;
}

export const RepeatedTitle = ({
  title,
  colorClasses,
  className = '',
  textClassName = '',
}: RepeatedTitleProps) => {
  return (
    <div className={cn(className)}>
      <Title
        className={clsx(
          'whitespace-nowrap py-12 text-giant text-vertical',
          'max-md:text-9xl',
          textClassName
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
