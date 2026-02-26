"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !barRef.current) return;

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress, force3D: true });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-[100] h-0.5 w-full origin-left bg-primary"
      aria-hidden
    />
  );
}
