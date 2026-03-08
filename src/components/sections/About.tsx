"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
import { siteConfig } from "@/lib/site-config";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const [imgError, setImgError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const section = sectionRef.current;
    const isMobile = window.innerWidth < 768;
    const smoothEase = "power3.out";

    // Initial hidden state for smooth entry so section doesn’t flash before animating (smooth on scroll up)
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        opacity: 0,
        x: isMobile ? 0 : -40,
        force3D: true,
        willChange: "transform, opacity",
      });
    }
    if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, y: 12, force3D: true, willChange: "transform, opacity" });
    if (headingRef.current) gsap.set(headingRef.current, { opacity: 0, y: 12, force3D: true, willChange: "transform, opacity" });
    if (summaryRef.current) gsap.set(summaryRef.current, { opacity: 0, y: 16, force3D: true, willChange: "transform, opacity" });
    if (focusRef.current) {
      gsap.set(focusRef.current.querySelectorAll("li"), { opacity: 0, y: 8, force3D: true, willChange: "transform, opacity" });
    }
    if (metaRef.current) gsap.set(metaRef.current, { opacity: 0, y: 12, force3D: true, willChange: "transform, opacity" });

    const ctx = gsap.context(() => {
      const clearWillChange = () => {
        [imageRef.current, labelRef.current, headingRef.current, summaryRef.current, metaRef.current].forEach(
          (el) => el && ((el as HTMLElement).style.willChange = "auto")
        );
        focusRef.current?.querySelectorAll("li").forEach((el) => ((el as HTMLElement).style.willChange = "auto"));
      };

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: smoothEase, force3D: true },
        onComplete: () => {
          clearWillChange();
          [imageRef.current, labelRef.current, headingRef.current, summaryRef.current, metaRef.current].forEach(
            (el) => el && gsap.set(el, { clearProps: "transform" })
          );
          if (focusRef.current) gsap.set(focusRef.current.querySelectorAll("li"), { clearProps: "transform" });
        },
      });

      // Image: smoother, slightly longer slide
      if (imageRef.current) {
        if (isMobile) {
          tl.to(imageRef.current, { opacity: 1, duration: 0.5 }, 0);
        } else {
          tl.to(imageRef.current, { x: 0, opacity: 1, duration: 0.6 }, 0);
        }
      }

      // Content: one flowing wave with overlapping timings
      if (labelRef.current) tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.03);
      if (headingRef.current) tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.42 }, 0.08);
      if (summaryRef.current) tl.to(summaryRef.current, { opacity: 1, y: 0, duration: 0.48 }, 0.14);
      if (focusRef.current) {
        const items = focusRef.current.querySelectorAll("li");
        tl.to(items, { opacity: 1, y: 0, duration: 0.36, stagger: 0.04 }, 0.22);
      }
      if (metaRef.current) tl.to(metaRef.current, { opacity: 1, y: 0, duration: 0.4 }, 0.38);

      ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="border-b border-border/50 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] w-full max-h-[480px] overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-xl ring-2 ring-border/20 lg:max-h-[520px]"
          >
            {!imgError ? (
              <Image
                src="/about.png"
                alt="Abubakar - Full Stack Developer"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImgError(true)}
                priority={false}
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/10 to-cyan-500/10 text-6xl font-bold text-muted-foreground">
                AH
              </div>
            )}
          </div>

          <div ref={contentRef} className="space-y-6">
            <p ref={labelRef} className="section-label">
              About
            </p>
            <h2 ref={headingRef} className="section-title">
              About Me
            </h2>
            <p ref={summaryRef} className="text-muted-foreground leading-relaxed">
              {siteConfig.summary}
            </p>
            <div ref={focusRef} className="space-y-3">
              <p className="text-sm font-semibold">I focus on:</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {siteConfig.focus.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              ref={metaRef}
              className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground"
            >
              <p>
                <span className="font-semibold text-foreground">Education:</span>{" "}
                {siteConfig.education.school} — {siteConfig.education.degree} ({siteConfig.education.duration})
              </p>
              <p>
                <span className="font-semibold text-foreground">Languages:</span>{" "}
                {siteConfig.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
