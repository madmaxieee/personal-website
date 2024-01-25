import type { MutableRefObject } from 'react';
import { useState, useRef, useEffect } from 'react';

import { type NextPage } from 'next';
import Head from 'next/head';

import {
  Parallax,
  ParallaxLayer,
  type IParallax,
} from '@react-spring/parallax';

import AboutMeContent from '@/components/AboutMeContent';
import BouncingChevron from '@/components/BouncingChevron';
import ParticleText from '@/components/ParticleTexts';
import LightDanceContent from '@/components/ProjectContents/LightDanceContent';
import RepeatedTitle from '@/components/RepeatedTitle';
import ScrollProgress from '@/components/ScrollProgress';
import SkillsContent from '@/components/SkillsContent';
import { clientEnv } from '@/env/schema.mjs';
import useIsMobile from '@/hooks/useIsMobile';

const LIGHT_DANCE_OFFSET = 4.5;
const GUESS_THE_LYRICS_OFFSET = LIGHT_DANCE_OFFSET + 3;
const SKILLS_OFFSET = GUESS_THE_LYRICS_OFFSET + 3;
const TOTAL_PAGES = SKILLS_OFFSET + 3;

const Home: NextPage = () => {
  const parallaxRef = useRef<IParallax>(null);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  const scrollTo = (offset: number) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(offset);
    }
  };

  const handleScroll = () => {
    const parallax = parallaxRef.current;
    parallax &&
      setProgress(parallax.current / parallax.space / (TOTAL_PAGES - 1));
  };

  useEffect(() => {
    const parallax = parallaxRef.current;
    if (parallax) {
      (
        parallax.container as MutableRefObject<HTMLDivElement>
      ).current.addEventListener('scroll', handleScroll);
    }

    return () => {
      // remove event listener
      if (parallax) {
        (
          parallax.container as MutableRefObject<HTMLDivElement>
        ).current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>madmaxieee | 莊加旭</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta
          name="description"
          content={
            'The personal website of madmaxieee, Max Chuang, 莊加旭 a web and software developer. ' +
            'He is also familiar with ML, AI, and data science. ' +
            'He is currently a student at the National Taiwan University studying electrical engineering. ' +
            'He is also working freelance as a web developer in the past year. '
          }
        />
        <meta
          name="keywords"
          content="莊加旭,madmaxieee,Max Chuang,NTUEE,NTU,Software Engineer,Web Developer,ML Engineer,freelance,Light Dance"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="madmaxieee | 莊加旭" />
        <meta
          property="og:description"
          content="The personal website of madmaxieee, Max Chuang, 莊加旭, a web and software developer."
        />
        <meta
          property="og:image"
          content={clientEnv.NEXT_PUBLIC_DOMAIN + '/madmax-og.png'}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="madmaxieee | 莊加旭" />
        <meta property="og:site_name" content="madmaxieee | 莊加旭" />
        <meta property="og:url" content={clientEnv.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:locale" content="en_US" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={clientEnv.NEXT_PUBLIC_DOMAIN} />
      </Head>
      <ScrollProgress progress={progress} />
      <Parallax
        pages={TOTAL_PAGES}
        className="top-0"
        ref={parallaxRef}
        config={{
          tension: 120,
          friction: 14,
        }}
      >
        {/* background */}
        <ParallaxLayer sticky={{ start: 0, end: 6 }}>
          <ParticleText isMobile={isMobile} text="madmax" />
          <button
            className="absolute top-3/4 grid w-full cursor-pointer place-items-center p-12 max-md:p-8"
            onClick={() => {
              scrollTo(1);
            }}
          >
            <BouncingChevron />
          </button>
        </ParallaxLayer>
        {/* about me */}
        <ParallaxLayer
          sticky={{ start: 1, end: 2.5 }}
          className="grid h-full w-full place-items-center"
        >
          <div className="top-1/5 relative -z-10 h-4/5 w-full bg-slate-400/20 backdrop-blur-xl"></div>
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{
            start: 1.3,
            end: 2,
          }}
        >
          <RepeatedTitle
            title="about"
            colorClasses={['text-white', 'text-white', 'text-white']}
            className="ml-12 max-md:ml-4"
          />
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{ start: 1, end: 2.5 }}
          className="grid h-full w-full place-items-center"
        >
          <div className="top-1/5 relative -z-10 h-4/5 w-full">
            <AboutMeContent isMobile={isMobile} />
          </div>
        </ParallaxLayer>
        {/* projects */}
        {/* light dance */}
        <>
          <ParallaxLayer
            sticky={{
              start: LIGHT_DANCE_OFFSET,
              end: LIGHT_DANCE_OFFSET + 1.5,
            }}
            className="grid h-full w-full place-items-center"
          >
            <div className="top-1/5 relative -z-10 h-4/5 w-full bg-slate-400/20 backdrop-blur-xl"></div>
          </ParallaxLayer>
          <ParallaxLayer
            sticky={{
              start: LIGHT_DANCE_OFFSET + 0.3,
              end: LIGHT_DANCE_OFFSET + 0.7,
            }}
          >
            <RepeatedTitle
              title="project"
              colorClasses={['text-white', 'text-white', 'text-white']}
              className="ml-12 max-md:ml-4"
            />
          </ParallaxLayer>
          <ParallaxLayer
            sticky={{
              start: LIGHT_DANCE_OFFSET,
              end: LIGHT_DANCE_OFFSET + 1.5,
            }}
            className="grid h-full w-full place-items-center"
          >
            <div className="top-1/5 relative h-4/5 w-full">
              <LightDanceContent isMobile={isMobile} />
            </div>
          </ParallaxLayer>
        </>
        {/* guess the lyrics */}
        <>
          <ParallaxLayer
            sticky={{
              start: GUESS_THE_LYRICS_OFFSET,
              end: GUESS_THE_LYRICS_OFFSET + 1.5,
            }}
            className="grid h-full w-full place-items-center"
          >
            <div className="top-1/5 relative -z-10 h-4/5 w-full bg-slate-400/20 backdrop-blur-xl"></div>
          </ParallaxLayer>
          <ParallaxLayer
            sticky={{
              start: GUESS_THE_LYRICS_OFFSET + 0.3,
              end: GUESS_THE_LYRICS_OFFSET + 0.7,
            }}
          >
            <RepeatedTitle
              title="project"
              colorClasses={['text-white', 'text-white', 'text-white']}
              className="ml-12 max-md:ml-4"
            />
          </ParallaxLayer>
          <ParallaxLayer
            sticky={{
              start: GUESS_THE_LYRICS_OFFSET,
              end: GUESS_THE_LYRICS_OFFSET + 1.5,
            }}
            className="grid h-full w-full place-items-center"
          >
            <div className="top-1/5 relative h-4/5 w-full">
              <LightDanceContent isMobile={isMobile} />
            </div>
          </ParallaxLayer>
        </>
        {/* skills */}
        <ParallaxLayer offset={SKILLS_OFFSET}>
          <div className="h-full bg-gradient-to-b from-black to-[var(--mantine-color-dark-7)]"></div>
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{
            start: SKILLS_OFFSET + 1.3,
            end: SKILLS_OFFSET + 3,
          }}
        >
          <SkillsContent />
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default Home;
