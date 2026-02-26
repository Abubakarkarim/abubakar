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
  const focusItemsRef = useRef<HTMLLIElement[]>([]);
  const metaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (imageRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (isMobile) {
              gsap.fromTo(imageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
            } else {
              gsap.fromTo(
                imageRef.current,
                { x: -100, opacity: 0, force3D: true },
                { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", force3D: true }
              );
            }
          },
        });
      }

      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (labelRef.current) {
              gsap.fromTo(
                labelRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, force3D: true }
              );
            }
            if (headingRef.current) {
              gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, delay: 0.05, force3D: true }
              );
            }
            if (summaryRef.current) {
              gsap.fromTo(
                summaryRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: "power3.out", force3D: true }
              );
            }
            if (focusRef.current) {
              const items = focusRef.current.querySelectorAll("li");
              gsap.fromTo(
                items,
                { opacity: 0, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  stagger: 0.06,
                  delay: 0.2,
                  ease: "power3.out",
                  force3D: true,
                }
              );
            }
            if (metaRef.current) {
              gsap.fromTo(
                metaRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, delay: 0.25, force3D: true }
              );
            }
          },
        });
      }
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
                alt="Abdul Haseeb - Full Stack Developer"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImgError(true)}
                priority={false}
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
