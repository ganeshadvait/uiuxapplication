"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
  useRef,
  HTMLAttributes,
  forwardRef,
  useState,
  useMemo,
  Ref,
  useEffect,
} from "react";

gsap.registerPlugin(ScrollTrigger);

export interface RadialScrollGalleryProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  scrollDuration?: number;
  visiblePercentage?: number;
  baseRadius?: number;
  mobileRadius?: number;
  startTrigger?: string;
  onItemSelect?: (index: number) => void;
  direction?: "ltr" | "rtl";
  disabled?: boolean;
}

function useMergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) return null;
    return (node: T) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      });
    };
  }, [refs]);
}

function useResponsiveValue(baseValue: number, mobileValue: number) {
  const [value, setValue] = useState(baseValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setValue(window.innerWidth < 768 ? mobileValue : baseValue);
    };

    handleResize();

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [baseValue, mobileValue]);

  return value;
}

export const FrequencyCircle = forwardRef<
  HTMLDivElement,
  RadialScrollGalleryProps
>(
  (
    {
      scrollDuration = 2500,
      visiblePercentage = 45,
      baseRadius = 550,
      mobileRadius = 220,
      className = "",
      startTrigger = "center center",
      onItemSelect,
      direction = "ltr",
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLLIElement>(null);

    const mergedRef = useMergeRefs(ref, pinRef);

    const [childSize, setChildSize] = useState<{ w: number; h: number } | null>(
      null
    );
    const [isMounted, setIsMounted] = useState(false);
    const currentRadius = useResponsiveValue(baseRadius, mobileRadius);
    const circleDiameter = currentRadius * 2;

    const { visibleDecimal, hiddenDecimal } = useMemo(() => {
      const clamped = Math.max(10, Math.min(100, visiblePercentage));
      const v = clamped / 100;
      return { visibleDecimal: v, hiddenDecimal: 1 - v };
    }, [visiblePercentage]);

    useEffect(() => {
      setIsMounted(true);

      if (!childRef.current) return;

      const observer = new ResizeObserver((entries) => {
        let hasChanged = false;
        for (const entry of entries) {
          setChildSize({
            w: entry.contentRect.width,
            h: entry.contentRect.height,
          });
          hasChanged = true;
        }
        if (hasChanged) {
          ScrollTrigger.refresh();
        }
      });

      observer.observe(childRef.current);
      return () => observer.disconnect();
    }, []);

    useGSAP(() => {
      if (!containerRef.current) return;

      const circle = containerRef.current.querySelector(".fc-circle");
      const centerText = containerRef.current.querySelector(".fc-center");
      const texts = containerRef.current.querySelectorAll(".fc-text");

      // Set initial states
      gsap.set([circle, centerText], { opacity: 0, scale: 0.8 });
      gsap.set(texts, { opacity: 0, scale: 0.5 });

      // First timeline: entrance animation (normal, not scrubbed)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none none",
        },
      });

      // Animate circle and center text on entrance
      entranceTl.to([circle, centerText], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // Second timeline: scroll-based reveal of benefit texts
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000", // How much scroll distance to reveal everything
          pin: true, // Lock the section
          scrub: 1, // Smooth scrubbing effect
          anticipatePin: 1,
        },
      });

      // Animate all benefit texts based on scroll
      scrollTl.to(texts, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
    }, []);

    const scaleFactor = 1.25;
    const calculatedBuffer = childSize
      ? childSize.h * scaleFactor - childSize.h + 60
      : 150;

    const visibleAreaHeight = childSize
      ? circleDiameter * visibleDecimal + childSize.h / 2 + calculatedBuffer
      : circleDiameter * visibleDecimal + 200;

    return (
      <>
        <div
          ref={mergedRef}
          className={`min-h-screen w-full relative flex items-center justify-center ${className}`}
          {...rest}
        >
          <div className="relative w-full overflow-hidden">
            <div
              ref={containerRef}
              className="w-full min-h-screen flex justify-center py-20"
            >
              <svg
                viewBox="-40 -40 580 580"
                className="w-full max-w-[600px]"
                style={{ overflow: "visible" }}
              >
                {/* Outer circle */}
                <circle
                  cx="250"
                  cy="250"
                  r="180"
                  fill="none"
                  stroke="#d6d2cc"
                  strokeWidth="1"
                  className="fc-circle"
                />

                {/* Center text */}
                <text
                  x="250"
                  y="255"
                  textAnchor="middle"
                  className="fc-center fill-[#3a3a3a] text-[28px] font-serif"
                >
                  Frequency
                </text>

                {/* Top */}
                <circle
                  cx="250"
                  cy="70"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="250"
                  y="40"
                  textAnchor="middle"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Regulates Nervous System
                </text>

                {/* Top Right */}
                <circle
                  cx="380"
                  cy="130"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="415"
                  y="135"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Decreases Anxiety
                </text>

                {/* Right */}
                <circle
                  cx="430"
                  cy="250"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="460"
                  y="255"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Improves Focus
                </text>

                {/* Bottom Right */}
                <circle
                  cx="380"
                  cy="370"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="415"
                  y="375"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Reduces Depression
                </text>

                {/* Bottom */}
                <circle
                  cx="250"
                  cy="430"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="250"
                  y="470"
                  textAnchor="middle"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Supports Emotional Release
                </text>

                {/* Top Left */}
                <circle
                  cx="120"
                  cy="130"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="100"
                  y="135"
                  textAnchor="end"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Expands Self-Transcendence
                </text>

                {/* Left */}
                <circle
                  cx="70"
                  cy="250"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="50"
                  y="255"
                  textAnchor="end"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Deepens Awareness
                </text>

                {/* Bottom Left */}
                <circle
                  cx="120"
                  cy="370"
                  r="8"
                  className="fc-text fill-[#f5f3ef] stroke-gray-400"
                />
                <text
                  x="100"
                  y="375"
                  textAnchor="end"
                  className="fc-text fill-gray-500 text-[12px] font-serif"
                >
                  Reduces PTSD Symptoms
                </text>
              </svg>
            </div>
          </div>
        </div>

      </>
    );
  }
);

