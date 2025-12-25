import Image from 'next/image';

import { Text, Container } from '@mantine/core';
import {
  IconMail,
  IconDownload,
  IconBrandGithub,
  IconBrandLinkedin,
} from '@tabler/icons-react';

import avatar from '@/assets/images/avatar.png';
import LinkButton from '@/components/LinkButton';
import { cn } from '@/utils/cn';

type AboutMeContentProps = {
  isMobile?: boolean;
};

export const AboutMeContent = ({ isMobile }: AboutMeContentProps) => {
  return (
    <Container size="sm" className="pt-16 max-md:pl-24 max-md:pt-8">
      <div
        className={cn(
          'mb-8 flex items-center gap-6',
          'max-md:mb-6 max-md:flex-col max-md:gap-4'
        )}
      >
        <Image
          src={avatar}
          width={200}
          height={200}
          alt="The illustration of Kahiok."
          className="rounded-2xl max-md:h-40 max-md:w-auto"
        />
        <div className="flex flex-col gap-4 max-md:gap-3">
          <LinkButton
            href="mailto:tsng@kahiok.com"
            color="red"
            size={isMobile ? 'xs' : 'sm'}
            icon={<IconMail />}
          >
            Send Email
          </LinkButton>
          <LinkButton
            href="https://github.com/madmaxieee"
            color="red"
            size={isMobile ? 'xs' : 'sm'}
            icon={<IconBrandGithub />}
          >
            Visit GitHub
          </LinkButton>
          <LinkButton
            href="https://www.linkedin.com/in/chuangjiaxu"
            color="red"
            size={isMobile ? 'xs' : 'sm'}
            icon={<IconBrandLinkedin />}
          >
            Visit LinkedIn
          </LinkButton>
          <LinkButton
            href="/files/Max_Chuang_Resume.pdf"
            color="red"
            size={isMobile ? 'xs' : 'sm'}
            icon={<IconDownload />}
          >
            Download Resume
          </LinkButton>
        </div>
      </div>
      <article>
        <Text className="break-words text-2xl font-semibold max-md:ml-10 max-md:text-sm">
          My name is 莊加旭 (Tsng, Kahiok in Taiwanese), and I also go by Max. I
          am a software engineer with a strong interest in building reliable,
          impactful systems. Over the past year and a half, I worked at Google
          as a firmware engineer, developing modem system software for Pixel
          phones. I have experience collaborating in cross‑functional teams and
          delivering production‑quality software, and I also work as a freelance
          engineer for businesses. I major in Electrical Engineering at National
          Taiwan University. I am fluent in English and motivated to pursue
          software engineering opportunities in Taiwan or abroad.
        </Text>
      </article>
    </Container>
  );
};

export default AboutMeContent;
