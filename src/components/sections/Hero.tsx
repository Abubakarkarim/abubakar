"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

function HeroAvatar() {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative flex justify-center"
    >
      <div className="relative h-[320px] w-[280px] overflow-hidden rounded-2xl border border-border/60 bg-muted/50 shadow-xl ring-2 ring-border/30 sm:h-[380px] sm:w-[320px]">
        {!imgError && (
          <Image
            src="/avatar.jpg"
            alt={siteConfig.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 280px, 320px"
            priority
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-6xl font-bold text-muted-foreground">
          AH
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % siteConfig.typingTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-x-hidden overflow-y-hidden border-b border-border/50 bg-gradient-to-b from-background via-background to-muted/20 py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--gradient-start)_0%,transparent_50%)] opacity-[0.07] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-cyan-500/[0.04] pointer-events-none" />
      <div className="container relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-border/60 bg-card/80 px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                  {siteConfig.experience} of Experience
                </span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  Open to work in {siteConfig.openToWorkIn.slice(0, 3).join(", ")} & more
                </span>
              </div>
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.1]">
                Hi, I&apos;m{" "}
                <span className="gradient-text">{siteConfig.name}</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                {siteConfig.title}
              </p>
              <div className="flex h-9 items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-2 font-medium text-foreground md:min-w-[260px] md:max-w-sm">
                <span className="min-w-[200px] sm:min-w-[240px]">
                  {siteConfig.typingTitles[index]}
                </span>
                <span className="animate-pulse text-muted-foreground">|</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
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
                <a href={siteConfig.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2.5 w-fit"
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
            </motion.div>
          </div>

          <HeroAvatar />
        </div>
      </div>
    </section>
  );
}
