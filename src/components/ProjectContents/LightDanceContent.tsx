import Image from 'next/image';

import { Text, Container, Anchor } from '@mantine/core';
import {
  IconWorld,
  IconBrandGithub,
  IconBrandYoutube,
} from '@tabler/icons-react';

import logo from '@/assets/images/LightDanceLogo.png';
import LinkButton from '@/components/LinkButton';
import { cn } from '@/utils/cn';

type LightDanceContentProps = {
  isMobile?: boolean;
};

export const LightDanceContent = ({ isMobile }: LightDanceContentProps) => {
  return (
    <Container size="sm" className="pt-16 max-md:pl-24 max-md:pt-8">
      <div
        className={cn(
          'mb-8 flex items-center gap-6',
          'max-md:mb-6 max-md:flex-col max-md:gap-4'
        )}
      >
        <div
          className={cn(
            'grid h-[200px] w-[200px] place-content-center rounded-2xl bg-black p-4',
            'max-md:h-40 max-md:w-40'
          )}
        >
          <Image src={logo} width={200} alt="The logo of NTUEE light dance." />
        </div>
        <div className="flex flex-col gap-4 max-md:gap-3">
          <LinkButton
            href="https://lightdance.ntuee.org/"
            color="red"
            icon={<IconWorld />}
            size={isMobile ? 'xs' : 'sm'}
          >
            Visit Website
          </LinkButton>
          <LinkButton
            href="https://youtu.be/rN6hMTVfCt4"
            color="red"
            icon={<IconBrandYoutube />}
            size={isMobile ? 'xs' : 'sm'}
          >
            Watch Video
          </LinkButton>
          <LinkButton
            href="https://github.com/NTUEELightDance/LightDance-Editor"
            color="red"
            icon={<IconBrandGithub />}
            size={isMobile ? 'xs' : 'sm'}
          >
            View Source Code
          </LinkButton>
        </div>
      </div>
      <article>
        <Text className="break-words text-2xl font-semibold max-md:ml-10 max-md:text-sm">
          NTUEE Light Dance is a group of 43 NTUEE students who are passionate
          about art and technology. The performance consists of choreography,
          music, handcraft, and engineering. There are a lot of challenges to
          overcome. I lead our software team of 12 students to conquer many
          technical challenges. The frontend, backend, firmware, hardware, and
          design teams should all work in synergy to make this happen.
          <span className="max-md:hidden">
            <br />
            <br />
          </span>
          Please visit our{' '}
          <Anchor href="https://lightdance.ntuee.org/">website</Anchor> for more
          information.
        </Text>
      </article>
    </Container>
  );
};

export default LightDanceContent;
