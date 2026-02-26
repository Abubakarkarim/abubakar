"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { isTouchOrReducedMotion } from "@/lib/gsap/prefersReducedMotion";

export function CursorFollower() {
  const circleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isTouchOrReducedMotion() || !circleRef.current) return;

    const el = circleRef.current;
    gsap.set(el, { opacity: 0, scale: 0.5 });

    const onMove = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
        force3D: true,
      });
    };

    const onEnter = () => {
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.2 });
    };

    const onLeave = () => {
      gsap.to(el, { opacity: 0, scale: 0.5, duration: 0.2 });
    };

    document.body.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseenter", onEnter);
    document.body.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (typeof window !== "undefined" && isTouchOrReducedMotion()) return null;

  return (
    <div
      ref={circleRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary mix-blend-difference"
      aria-hidden
    />
  );
}
