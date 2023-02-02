import Image from "next/image";

import { Text, Container } from "@mantine/core";

import avatar from "@/assets/images/avatar.png";

export const AboutMeContent = () => {
  return (
    <Container size="sm" className="ml-108 pt-16">
      <Image
        src={avatar}
        width={200}
        height={200}
        alt="The illustration of Max Chuang."
        className="mb-8 rounded-2xl"
      />
      <Text className="text-2xl font-semibold">
        I major in electrical engineering at National Taiwan University. I'm a
        software engineer who loves to create things. I can build applications
        in teams. I work as a freelance engineer for businesses as well. I can
        speak English well. I'm excited to pursue a career as a software
        engineer, whether it be here in Taiwan or abroad.
      </Text>
    </Container>
  );
};

export default AboutMeContent;
