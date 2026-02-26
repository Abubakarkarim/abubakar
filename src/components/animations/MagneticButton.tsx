"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { isTouchOrReducedMotion } from "@/lib/gsap/prefersReducedMotion";

const MAGNETIC_STRENGTH = 0.3;

export function MagneticButton({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (isTouchOrReducedMotion() || !ref.current) return;

    const el = ref.current;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, {
        x: x * MAGNETIC_STRENGTH,
        y: y * MAGNETIC_STRENGTH,
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)", force3D: true });
    };

    el.addEventListener("mousemove", onMouseMove as EventListener);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove as EventListener);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <span ref={ref} className={className ? `inline-block ${className}` : "inline-block"} {...props}>
      {children}
    </span>
  );
}
