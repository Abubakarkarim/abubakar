"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillsData } from "@/lib/constants/skills";
import { cn } from "@/lib/utils";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const cardCleanups: (() => void)[] = [];
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      if (labelRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              labelRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, force3D: true }
            );
          },
        });
      }
      if (headingRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              headingRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, delay: 0.05, force3D: true }
            );
          },
        });
      }
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-skill-card]");
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            if (isMobile) {
              gsap.fromTo(
                cards,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, stagger: 0.08 }
              );
            } else {
              gsap.fromTo(
                cards,
                { scale: 0.8, opacity: 0, force3D: true },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.6,
                  stagger: 0.08,
                  ease: "back.out(1.2)",
                  force3D: true,
                }
              );
            }
          },
        });

        cards.forEach((card) => {
          if (isMobile) return;
          const el = card as HTMLElement;
          const onEnter = () => {
            gsap.to(el, { scale: 1.05, duration: 0.25, ease: "power2.out", force3D: true });
          };
          const onLeave = () => {
            gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.35, ease: "power2.out", force3D: true });
          };
          const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
            gsap.to(el, { x, y, duration: 0.3, ease: "power2.out", force3D: true });
          };
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          el.addEventListener("mousemove", onMove as EventListener);
          cardCleanups.push(() => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            el.removeEventListener("mousemove", onMove as EventListener);
          });
        });
      }
    }, sectionRef);

    return () => {
      cardCleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="border-b border-border/50 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <p ref={labelRef} className="section-label text-center">
          Technologies
        </p>
        <h2 ref={headingRef} className="section-title mb-14 text-center">
          Skills
        </h2>

        <div
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillsData.map((category) => (
            <Card
              key={category.name}
              data-skill-card
              className="glass-card card-hover h-full border-border/50"
            >
              <CardHeader className="pb-2">
                <h3 className="font-heading text-lg font-semibold">
                  {category.name}
                </h3>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <Badge
                    key={skill.name}
                    variant="secondary"
                    className={cn("font-normal text-xs")}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
