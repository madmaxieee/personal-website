import type { MutableRefObject } from "react";
import { useState, useRef, useEffect } from "react";

import { type NextPage } from "next";
import Head from "next/head";
import { clientEnv } from "@/env/schema.mjs";

import {
  Parallax,
  ParallaxLayer,
  type IParallax,
} from "@react-spring/parallax";

import ParticleText from "@/components/ParticleTexts";
import BouncingChevron from "@/components/BouncingChevron";
import RepeatedTitle from "@/components/RepeatedTitle";
import AboutMeContent from "@/components/AboutMeContent";
import LightDanceContent from "@/components/ProjectContents/LightDanceContent";
import SkillsContent from "@/components/SkillsContent";
import ScrollProgress from "@/components/ScrollProgress";

const TOTAL_PAGES = 11;

const Home: NextPage = () => {
  const parallaxRef = useRef<IParallax>(null);
  const [progress, setProgress] = useState(0);

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
      ).current.addEventListener("scroll", handleScroll);
    }

    return () => {
      // remove event listener
      if (parallax) {
        (
          parallax.container as MutableRefObject<HTMLDivElement>
        ).current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>madmaxieee</title>
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta
          name="description"
          content={
            "The personal website of madmaxieee, Max Chuang, a web and software developer. " +
            "He is also familiar with ML, AI, and data science. " +
            "He is currently a student at the National Taiwan University studying electrical engineering. " +
            "He have worked on projects such as the Light Dance Editor, a web app the NTUEE light dance team uses to design their light dance performances. " +
            "He is also working freelance as a web developer in the past year. " +
            "He is looking for a software engineering internship for summer 2023."
          }
        />
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
          <ParticleText text="madmax" />
          <button
            className="absolute top-3/4 grid w-full cursor-pointer place-items-center p-12"
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
            colorClasses={["text-white", "text-white", "text-white"]}
            className="ml-12"
          />
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{ start: 1, end: 2.5 }}
          className="grid h-full w-full place-items-center"
        >
          <div className="top-1/5 relative -z-10 h-4/5 w-full">
            <AboutMeContent />
          </div>
        </ParallaxLayer>
        {/* projects */}
        {/* light dance */}
        <ParallaxLayer
          sticky={{ start: 4.5, end: 6 }}
          className="grid h-full w-full place-items-center"
        >
          <div className="top-1/5 relative -z-10 h-4/5 w-full bg-slate-400/20 backdrop-blur-xl"></div>
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{
            start: 4.8,
            end: 5.2,
          }}
        >
          <RepeatedTitle
            title="project"
            colorClasses={["text-white", "text-white", "text-white"]}
            className="ml-12"
          />
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{ start: 4.5, end: 6 }}
          className="grid h-full w-full place-items-center"
        >
          <div className="top-1/5 relative h-4/5 w-full">
            <LightDanceContent />
          </div>
        </ParallaxLayer>
        {/* skills */}
        <ParallaxLayer offset={7}>
          <div className="h-full bg-gradient-to-b from-black to-[var(--mantine-color-dark-7)]"></div>
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{
            start: 8.3,
            end: 10,
          }}
        >
          <SkillsContent />
        </ParallaxLayer>
      </Parallax>
    </>
  );
};

export default Home;
