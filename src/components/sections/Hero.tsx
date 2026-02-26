"use client";

import { useState, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Download, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { gsap } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
function HeroAvatar() {
  const [imgError, setImgError] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, scale: 0.95, force3D: true },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          force3D: true,
        }
      );
      gsap.to(wrapperRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
        delay: 1.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex justify-center">
      <div className="relative h-[320px] w-[280px] overflow-hidden rounded-2xl border border-border/60 bg-muted/50 shadow-xl ring-2 ring-border/30 sm:h-[380px] sm:w-[320px]">
        {!imgError && (
          <Image
            src="/avatar.png"
            alt={siteConfig.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 280px, 320px"
            priority
            onError={() => setImgError(true)}
          />
        )}

      </div>
    </div>
  );
}

export function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null);
  const nameGradientRef = useRef<HTMLSpanElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    let typingInterval: ReturnType<typeof setInterval> | undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 }
        );
      }

      if (nameGradientRef.current) {
        tl.fromTo(
          nameGradientRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
      }

      const typingEl = typingRef.current;
      if (typingEl) {
        const titles = siteConfig.typingTitles;
        let i = 0;
        tl.fromTo(typingEl, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=0.2");
        const cycle = () => {
          gsap.to(typingEl, {
            text: titles[i % titles.length],
            duration: 0.5,
            ease: "power2.inOut",
          });
          i++;
        };
        cycle();
        typingInterval = setInterval(cycle, 2500);
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );
      }

      if (buttonsRef.current) {
        const kids = buttonsRef.current.querySelectorAll("a, button");
        tl.fromTo(
          kids,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.2"
        );
      }

      if (socialRef.current) {
        const kids = socialRef.current.querySelectorAll("a");
        tl.fromTo(
          kids,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 0.06 },
          "-=0.1"
        );
      }
    });

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-x-hidden overflow-y-hidden border-b border-border/50 bg-gradient-to-b from-background via-background to-muted/20 py-28 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--gradient-start)_0%,transparent_50%)] opacity-[0.08] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.06] via-transparent to-cyan-500/[0.06] pointer-events-none" />
      <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <div ref={badgeRef} className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full border-2 border-primary/50 bg-primary/20 px-4 py-2 text-sm font-semibold text-primary shadow-md backdrop-blur-sm ring-1 ring-primary/20">
                  {siteConfig.experience} of Experience
                </span>
                <span className="inline-flex items-center rounded-full border-2 border-primary/50 bg-primary/20 px-4 py-2 text-sm font-semibold text-primary shadow-md backdrop-blur-sm ring-1 ring-primary/20">
                  {siteConfig.projectsCompleted} Projects Delivered
                </span>
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.05]">
                <span className="block text-foreground">Hi, I&apos;m</span>
                <span
                  ref={nameGradientRef}
                  className="hero-name gradient-text mt-1 block text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  {siteConfig.name}
                </span>
              </h1>
              <p ref={titleRef} className="text-lg text-muted-foreground md:text-xl">
                {siteConfig.title}
              </p>
              <p className="text-sm text-muted-foreground/90">
                {siteConfig.location}
              </p>
              <div className="flex h-10 items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-2.5 font-medium text-foreground shadow-sm md:min-w-[280px] md:max-w-sm">
                <span ref={typingRef} className="min-w-[200px] sm:min-w-[240px]">
                  {siteConfig.typingTitles[0]}
                </span>
                <span className="animate-pulse text-muted-foreground">|</span>
              </div>
            </div>

            <div ref={buttonsRef} className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="gap-2 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                <Link href="#contact">
                  Hire Me
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl border-border/60">
                <Link href="#services">
                  <Briefcase className="h-4 w-4" />
                  View Services
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="gap-2 rounded-xl">
                <a
                  href={siteConfig.resumeUrl}
                  download="Abdul-Haseeb-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div
              ref={socialRef}
              className="flex items-center gap-3 rounded-full border border-border/50 bg-card/50 px-5 py-3 shadow-sm w-fit"
            >
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <span className="h-4 w-px bg-border" />
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <span className="h-4 w-px bg-border" />
              <a
                href={siteConfig.social.email}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroAvatar />
          </div>
        </div>
      </div>
    </section>
  );
}
