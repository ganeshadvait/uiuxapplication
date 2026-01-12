//File : components/tabs.tsx
"use client";
import { useState, useRef } from "react";
import styles from "./Header/button/style.module.scss";

import IntfiniteScroll from "@/components/inifnite-scroll";
import InfiniteScrollLandscape from "@/components/infinite-scroll-landscape";
import FlipButton from "@/components/ui/FlipButton";

export default function Tabs() {
  const [isWeb, setIsWeb] = useState(true);
  const showcaseRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  const scrollToShowcase = () => {
    // Smoothly scroll to the work-showcase section
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      const el = document.getElementById("work-showcase");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      <section>
        <div className="p-2 rounded-full w-[400px]  bg-white border-1 border-gray-100  flex items-center justify-between gap-1 shadow-md mb-4 fixed bottom-10 left-1/2 transform -translate-x-1/2 z-100">
          <button
            onClick={() => {
              setIsWeb(true);
              scrollToShowcase();
            }}
            aria-pressed={isWeb}
            className={` tabBtn w-full rounded-full font-bold py-4 px-6 ${
              isWeb
                ? "bg-[#c9fd74] text-black"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            <FlipButton
              isActive={isWeb}
              toggleMenu={() => {
                setIsWeb(true);
                scrollToShowcase();
              }}
              className="justify-center items-center"
              label="Web"
            />
          </button>
          <button
            onClick={() => {
              setIsWeb(false);
              scrollToShowcase();
            }}
            aria-pressed={!isWeb}
            className={`tabBtn w-full rounded-full font-bold py-4 px-6 ${
              !isWeb
                ? "bg-[#c9fd74] text-black"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            <FlipButton
              isActive={!isWeb}
              toggleMenu={() => {
                setIsWeb(false);
                scrollToShowcase();
              }}
              className="justify-center items-center"
              label="Mobile"
            />
          </button>
        </div>

        <section id="work-showcase" ref={showcaseRef} className="bg-[#09090B]">
          {isWeb ? <InfiniteScrollLandscape /> : <IntfiniteScroll />}
        </section>
      </section>
    </>
  );
}
