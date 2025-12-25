import Image from 'next/image';

import { Text, Container, Anchor } from '@mantine/core';
import { IconWorld, IconBrandGithub } from '@tabler/icons-react';

import logo from '@/assets/images/guess-the-lyrics-logo.png';
import LinkButton from '@/components/LinkButton';
import { cn } from '@/utils/cn';

type GuessTheLyricsContentProps = {
  isMobile?: boolean;
};

export const GuessTheLyricsContent = ({
  isMobile,
}: GuessTheLyricsContentProps) => {
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
            'grid h-[200px] w-[200px] place-content-center rounded-2xl bg-white p-4',
            'max-md:h-40 max-md:w-40'
          )}
        >
          <Image src={logo} width={200} alt="The logo of NTUEE light dance." />
        </div>
        <div className="flex flex-col gap-4 max-md:gap-3">
          <LinkButton
            href="https://guess-the-lyrics.vercel.app/"
            color="red"
            icon={<IconWorld />}
            size={isMobile ? 'xs' : 'sm'}
          >
            Visit Website
          </LinkButton>
          <LinkButton
            href="https://github.com/madmaxieee/guess-the-lyrics"
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
          Guess the Lyrics is a web app that tests your knowledge of song
          lyrics. It is built with Next.js, TypeScript, and Tailwind CSS. The
          app let's search for whatever song you want to guess the lyrics of. It
          also supports random song selection which selects a random song from a
          specified album or artist. I built this app over a weekend as a fun
          side project. Hope you enjoy it!
          <span className="max-md:hidden">
            <br />
            <br />
          </span>
          The source code is available on{' '}
          <Anchor href="https://github.com/madmaxieee/guess-the-lyrics">
            GitHub
          </Anchor>{' '}
          and the app is deployed on Vercel.
        </Text>
      </article>
    </Container>
  );
};

export default GuessTheLyricsContent;
