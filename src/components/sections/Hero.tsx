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
      <div className="relative h-[320px] w-[280px] overflow-hidden rounded-2xl border border-border/50 bg-muted/50 shadow-2xl sm:h-[380px] sm:w-[320px]">
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
      className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-background to-muted/30 py-20 md:py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-sm font-medium text-muted-foreground">
                {siteConfig.experience} of Experience
              </p>
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Hi, I&apos;m{" "}
                <span className="gradient-text">{siteConfig.name}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {siteConfig.title}
              </p>
              <div className="flex h-8 items-center gap-2 text-lg font-medium text-foreground">
                <span className="min-w-[240px] sm:min-w-[280px]">
                  {siteConfig.typingTitles[index]}
                </span>
                <span className="animate-pulse">|</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="#contact">
                  Hire Me
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="#projects">
                  <Briefcase className="h-4 w-4" />
                  View Projects
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="gap-2">
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
              className="flex gap-4"
            >
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={siteConfig.social.email}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </motion.div>
          </div>

          <HeroAvatar />
        </div>
      </div>
    </section>
  );
}
