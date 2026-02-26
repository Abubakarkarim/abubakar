"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { isTouchOrReducedMotion } from "@/lib/gsap/prefersReducedMotion";

export function CursorFollower() {
  const circleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (isTouchOrReducedMotion() || !circleRef.current) return;

    const el = circleRef.current;
    gsap.set(el, {
      opacity: 0,
      scale: 0.5,
      xPercent: -50,
      yPercent: -50,
      force3D: true,
    });

    const setX = gsap.quickTo(el, "x", { duration: 0.28, ease: "power2.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.28, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    const onEnter = () => {
      gsap.to(el, { opacity: 1, scale: 1, duration: 0.15, force3D: true });
    };

    const onLeave = () => {
      gsap.to(el, { opacity: 0, scale: 0.5, duration: 0.15, force3D: true });
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
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 rounded-full border-2 border-primary mix-blend-difference will-change-transform"
      aria-hidden
    />
  );
}
