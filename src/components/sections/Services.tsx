"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
import {
  Layers,
  Brain,
  Globe,
  Code,
  Rocket,
  Smartphone,
  Cloud,
  Database,
  Palette,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { servicesData } from "@/lib/constants/services";

const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  brain: Brain,
  globe: Globe,
  code: Code,
  rocket: Rocket,
  smartphone: Smartphone,
  cloud: Cloud,
  database: Database,
  palette: Palette,
  messageCircle: MessageCircle,
};

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const section = sectionRef.current;
    const isMobile = window.innerWidth < 768;
    const cardCleanups: (() => void)[] = [];

    // Initial hidden state for smooth entry when scrolling up or down
    if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, y: 14, force3D: true });
    if (headingRef.current) gsap.set(headingRef.current, { opacity: 0, y: 14, force3D: true });
    if (cardsRef.current) {
      gsap.set(cardsRef.current.querySelectorAll("[data-service-card]"), {
        opacity: 0,
        y: 24,
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
        const cards = cardsRef.current.querySelectorAll("[data-service-card]");
        tl.to(cards, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04 }, 0.06);

        cards.forEach((card) => {
          if (isMobile) return;
          const el = card as HTMLElement;
          const onEnter = () => {
            gsap.to(el, { scale: 1.03, duration: 0.15, ease: "power2.out", force3D: true });
          };
          const onLeave = () => {
            gsap.to(el, { scale: 1, duration: 0.18, ease: "power2.out", force3D: true });
          };
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cardCleanups.push(() => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, sectionRef);

    return () => {
      cardCleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="border-b border-border/50 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <p ref={labelRef} className="section-label text-center">
          What I Offer
        </p>
        <h2 ref={headingRef} className="section-title mb-14 text-center">
          Services
        </h2>

        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] ?? Layers;
            return (
              <Card
                key={service.title}
                data-service-card
                className="glass-card card-hover h-full border-border/50"
              >
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
