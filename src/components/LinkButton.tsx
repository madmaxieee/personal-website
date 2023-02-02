import type { ReactNode } from "react";

import type { DefaultMantineColor } from "@mantine/core";
import { Button } from "@mantine/core";

export interface LinkButtonProps {
  href: string;
  color: DefaultMantineColor;
  children: ReactNode;
  icon?: ReactNode;
}

export const LinkButton = ({ href, icon, children }: LinkButtonProps) => {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      color="red"
      variant="outline"
      leftIcon={icon}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
