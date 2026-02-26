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

    const section = sectionRef.current;

    // Initial hidden state for smooth entry when scrolling up or down
    if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, y: 14, force3D: true });
    if (headingRef.current) gsap.set(headingRef.current, { opacity: 0, y: 14, force3D: true });
    if (cardsRef.current) {
      gsap.set(cardsRef.current.querySelectorAll("[data-testimonial-card]"), {
        y: 28,
        opacity: 0,
        force3D: true,
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.out", force3D: true },
      });

      if (labelRef.current) tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0);
      if (headingRef.current) tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.28 }, 0.03);
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll("[data-testimonial-card]");
        tl.to(cards, { y: 0, opacity: 1, duration: 0.35, stagger: 0.04 }, 0.06);
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
