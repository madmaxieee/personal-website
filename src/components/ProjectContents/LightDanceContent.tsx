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
    <Container size="sm" className="ml-144 pt-16">
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
      <article>
        <Text className="text-2xl font-semibold">
          NTUEE Light Dance is a group of 43 NTUEE students who are passionate
          about art and technology. The performance consists of choreography,
          music, handcraft, and engineering. There are a lot of challenges to
          overcome. The frontend, backend, hardware, and design teams should all
          work in synergy to make this happen.
          <br />
          <br />I lead our software team of 12 students to conquer many
          technical challenges. I learned a lot from this experience. This will
          be something I'll never forget. Please visit our website for more
          information.
        </Text>
      </article>
    </Container>
  );
};

export default LightDanceContent;
