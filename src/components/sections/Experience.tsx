"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
import { experienceData } from "@/lib/constants/experience";
import { Briefcase } from "lucide-react";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const section = sectionRef.current;
    const isMobile = window.innerWidth < 768;

    // Initial hidden state for smooth entry when scrolling up or down
    if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, y: 14, force3D: true });
    if (headingRef.current) gsap.set(headingRef.current, { opacity: 0, y: 14, force3D: true });
    if (lineRef.current) gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top", force3D: true });
    if (stepsRef.current) {
      const nodes = stepsRef.current.querySelectorAll("[data-step-node]");
      const cards = stepsRef.current.querySelectorAll("[data-step-card]");
      gsap.set(nodes, { scale: 0, opacity: 0, force3D: true });
      const fromX = isMobile ? 20 : 48;
      cards.forEach((card, i) => {
        const from = i % 2 === 1 && !isMobile ? fromX : -fromX;
        gsap.set(card, { opacity: 0, x: from, force3D: true });
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out", force3D: true },
      });

      if (labelRef.current) tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0);
      if (headingRef.current) tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0.03);
      if (lineRef.current) tl.to(lineRef.current, { scaleY: 1, duration: 0.35 }, 0.05);
      if (stepsRef.current) {
        const nodes = stepsRef.current.querySelectorAll("[data-step-node]");
        const cards = stepsRef.current.querySelectorAll("[data-step-card]");
        tl.to(nodes, { scale: 1, opacity: 1, duration: 0.25, stagger: 0.05, ease: "back.out(1.12)" }, 0.08);
        cards.forEach((card, i) => {
          tl.to(card, { opacity: 1, x: 0, duration: 0.28 }, 0.1 + i * 0.04);
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="overflow-hidden border-b border-border/50 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <p ref={labelRef} className="section-label text-center">
          Experience
        </p>
        <h2 ref={headingRef} className="section-title mb-16 text-center">
          Work Experience
        </h2>

        <div ref={stepsRef} className="relative">
          {/* Stepper line */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/30 md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <div className="space-y-12 md:space-y-16">
            {experienceData.map((job, index) => (
              <div
                key={job.company + job.duration}
                className={`relative flex items-start gap-6 md:gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step content - left on even, right on odd (via flex-row-reverse) */}
                <div
                  data-step-card
                  className={`order-2 min-w-0 flex-1 md:order-1 md:max-w-[calc(50%-3rem)] ${
                    index % 2 === 1 ? "" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {job.duration}
                    </p>
                    <h3 className="font-heading mt-2 text-xl font-semibold">
                      {job.position}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {job.company}
                    </p>
                    <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="flex gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                            {r}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step node - left on mobile (on line), center on desktop */}
                <div
                  data-step-node
                  className="relative z-10 order-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background shadow-lg ring-4 ring-primary/10 md:order-2"
                >
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>

                {/* Spacer - balances the row on desktop */}
                <div className="order-3 hidden flex-1 md:block md:max-w-[calc(50%-3rem)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
