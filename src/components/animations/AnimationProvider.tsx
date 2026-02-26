"use client";

import { type ReactNode, useLayoutEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { PageLoader } from "./PageLoader";
import { ScrollProgress } from "./ScrollProgress";
import { CursorFollower } from "./CursorFollower";

export function AnimationProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CursorFollower />
      {children}
    </>
  );
}
