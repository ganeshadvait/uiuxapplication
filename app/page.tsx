"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import PinnedImageReveal from "@/components/pinnedImageReveal";
import ZeroExpansion from "@/components/zeroexpansion";
import FlipCarousel from "@/components/flipcarousel";
import Header from "@/components/aheader";
import IntfiniteScroll from "@/components/inifnite-scroll";
import FeaturesSection from "@/components/scrollreveal";


export default function HomePage() {
  return (
    <>
      <Hero />
      <PinnedImageReveal />
      <ZeroExpansion />
      <FlipCarousel />
      <IntfiniteScroll />
      <Header />
      <FeaturesSection />
  
    </>
  );
}
