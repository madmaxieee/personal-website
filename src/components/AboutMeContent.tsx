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

export const AboutMeContent = () => {
  return (
    <Container size="sm" className="pt-16">
      <div className="mb-8 flex items-center gap-6">
        <Image
          src={avatar}
          width={200}
          height={200}
          alt="The illustration of Max Chuang."
          className="rounded-2xl"
        />
        <div className="flex flex-col gap-4">
          <LinkButton
            href="mailto:chuangjiaxu@gmail.com"
            color="red"
            icon={<IconMail />}
          >
            Send Email
          </LinkButton>
          <LinkButton
            href="https://github.com/madmaxieee"
            color="red"
            icon={<IconBrandGithub />}
          >
            Visit GitHub
          </LinkButton>
          <LinkButton
            href="https://www.linkedin.com/in/chuangjiaxu"
            color="red"
            icon={<IconBrandLinkedin />}
          >
            Visit LinkedIn
          </LinkButton>
          <LinkButton
            href="/files/Max_Chuang_Resume.pdf"
            color="red"
            icon={<IconDownload />}
          >
            Download Resume
          </LinkButton>
        </div>
      </div>
      <article>
        <Text className="text-2xl font-semibold">
          My name is 莊加旭, or Max Chuang. I major in electrical engineering at
          National Taiwan University. I'm a software engineer who loves to
          create things. I can build applications in teams. I work as a
          freelance engineer for businesses as well. I can speak English well.
          I'm excited to pursue a career as a software engineer, whether it be
          here in Taiwan or abroad.
        </Text>
      </article>
    </Container>
  );
};

export default AboutMeContent;
