"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialsData } from "@/lib/constants/testimonials";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
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
        const cards = cardsRef.current.querySelectorAll("[data-testimonial-card]");
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: 100, opacity: 0, force3D: true },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                force3D: true,
              }
            );
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="border-b border-border/50 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <p ref={labelRef} className="section-label text-center">
          Testimonials
        </p>
        <h2 ref={headingRef} className="section-title mb-14 text-center">
          What Others Say
        </h2>

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((t) => (
            <Card
              key={t.name + t.company}
              data-testimonial-card
              className="glass-card card-hover h-full border-border/50"
            >
              <CardContent className="pt-6">
                <Quote className="mb-4 h-10 w-10 text-primary/30" />
                <p className="text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 border-t border-border/50 pt-4">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
