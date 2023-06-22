import type { ReactNode } from 'react';

import type { DefaultMantineColor } from '@mantine/core';
import { Button } from '@mantine/core';

export interface LinkButtonProps {
  href: string;
  color: DefaultMantineColor;
  children: ReactNode;
  icon?: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const LinkButton = ({ href, icon, children, size }: LinkButtonProps) => {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="red"
      variant="outline"
      leftIcon={icon}
      size={size ?? 'sm'}
      className="backdrop-blur-sm"
    >
      {children}
    </Button>
  );
};

export default LinkButton;
