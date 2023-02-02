import Image from "next/image";

import { Text, Container } from "@mantine/core";
import {
  IconWorld,
  IconBrandGithub,
  IconBrandYoutube,
} from "@tabler/icons-react";

import logo from "@/assets/images/LightDanceLogo.png";

import LinkButton from "@/components/LinkButton";

export const LightDanceContent = () => {
  return (
    <Container size="sm" className="ml-108 pt-16">
      <div className="mb-8 flex items-center gap-8">
        <div className="grid h-[200px] w-[200px] place-content-center rounded-2xl bg-black p-4">
          <Image src={logo} width={200} alt="The logo of NTUEE light dance." />
        </div>
        <div className="flex flex-col gap-4">
          <LinkButton
            href="https://lightdance.ntuee.org/"
            color="red"
            icon={<IconWorld />}
          >
            Visit Website
          </LinkButton>
          <LinkButton
            href="https://youtu.be/rN6hMTVfCt4"
            color="red"
            icon={<IconBrandYoutube />}
          >
            Watch Video
          </LinkButton>
          <LinkButton
            href="https://github.com/NTUEELightDance/LightDance-Editor"
            color="red"
            icon={<IconBrandGithub />}
          >
            View Source Code
          </LinkButton>
        </div>
      </div>
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

export default LightDanceContent;
