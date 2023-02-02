import { Title, Text } from "@mantine/core";
import { type IconType } from "react-icons";

export interface AboutMeItemProps {
  title: string;
  description: string;
  Icon: IconType;
}

export const AboutMeItem = ({ title, description, Icon }: AboutMeItemProps) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <Icon fontSize="1.5rem" />
      <Title order={3}>{title}</Title>
      <Text>{description}</Text>
    </div>
  );
};

export default AboutMeItem;
