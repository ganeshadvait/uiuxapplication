import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const phone = containerRef.current.querySelector(".phone-center");
    const cards = containerRef.current.querySelectorAll(".feature-card");

    // Set initial states
    gsap.set(phone, { opacity: 0, scale: 0.9, y: 20 });
    gsap.set(cards, { opacity: 0, scale: 0.95, y: 30 });

    // First timeline: entrance animation for phone (normal, not scrubbed)
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        toggleActions: "play none none none",
      },
    });

    entranceTl.to(phone, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Second timeline: scroll-based reveal of feature cards
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    scrollTl.to(cards, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#d6d2cc] flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Top Left - Guided sessions */}
        <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8] md:col-start-1 md:row-start-1">
          <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
            Guided sessions
          </h3>
          <p className="text-[#6b6b6b] leading-relaxed">
            Access structured breath patterns with sound cues and rhythmic
            guidance.
          </p>
        </div>

        {/* Center - Phone */}
        <div className="phone-center md:col-start-2 md:row-start-1 md:row-span-2 flex justify-center">
          <div className="relative">
            <div className="w-[280px] h-[570px] bg-[#2a2a2a] rounded-[50px] p-3 shadow-2xl border-8 border-[#1a1a1a]">
              <div className="w-full h-full bg-gradient-to-br from-[#4a5a4a] to-[#2a3a2a] rounded-[42px] overflow-hidden relative">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-3xl z-10"></div>

                {/* Phone content */}
                <div className="relative h-full flex flex-col p-8 pt-16 text-white">
                  <h2 className="text-xl font-serif mb-2 leading-tight">
                    Transform stress, anxiety,
                    <br />
                    and PTSD through clinically
                    <br />
                    proven breathwork
                  </h2>
                  <p className="text-xs text-gray-300 mb-8">
                    A clinically supported breathwork app taking on stress,
                    anxiety, complex trauma, and PTSD for emotional
                    transformation.
                  </p>

                  <ul className="space-y-4 mb-auto text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>
                        Scientifically backed techniques for anxiety, depression
                        and PTSD.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>
                        Measure your growth with 8 core emotional indicators.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>
                        Guided sessions by Frequency Breathwork founder Vivian
                        Rosenthal.
                      </span>
                    </li>
                  </ul>

                  <button className="w-full bg-white text-[#2a3a2a] py-4 rounded-xl font-medium mt-4">
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right - Personalized recommendations */}
        <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8] md:col-start-3 md:row-start-1">
          <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
            Personalized recommendations
          </h3>
          <p className="text-[#6b6b6b] leading-relaxed">
            The app adapts to your needs — stress, clarity, focus, or emotional
            release.
          </p>
        </div>

        {/* Bottom Left - Daily practices */}
        <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8] md:col-start-1 md:row-start-2">
          <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
            Daily practices
          </h3>
          <p className="text-[#6b6b6b] leading-relaxed">
            Short practices for morning grounding, anxiety relief, and deep
            rest.
          </p>
        </div>

        {/* Bottom Right - Progress tracking */}
        <div className="feature-card bg-[#e8e6e1] rounded-2xl p-8 border border-[#c5c1b8] md:col-start-3 md:row-start-2">
          <div className="w-12 h-12 bg-[#3a3a3a] rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-[#3a3a3a] mb-3">
            Progress tracking
          </h3>
          <p className="text-[#6b6b6b] leading-relaxed">
            Monitor your emotional & nervous system shifts over time.
          </p>
        </div>
      </div>
    </div>
  );
}
export default FeaturesSection;