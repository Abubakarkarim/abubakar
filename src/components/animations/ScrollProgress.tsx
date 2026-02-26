"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !barRef.current) return;

    const bar = barRef.current;
    gsap.set(bar, { scaleX: 0, transformOrigin: "left", force3D: true });
    const setProgress = gsap.quickTo(bar, "scaleX", {
      duration: 0.25,
      ease: "power2.out",
    });

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-[100] h-0.5 w-full origin-left bg-primary will-change-transform"
      aria-hidden
    />
  );
}
