"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
import { siteConfig } from "@/lib/site-config";

export function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      setHidden(true);
      return;
    }

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    if (!overlay || !logo) return;

    gsap.set(overlay, { opacity: 1 });
    gsap.set(logo, { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setHidden(true);
          },
        });
      },
    });

    tl.to(logo, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.2)",
      force3D: true,
    }).to(logo, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-background"
      aria-hidden
    >
      <div
        ref={logoRef}
        className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        {siteConfig.name}
      </div>
    </div>
  );
}
