"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = siteConfig.navLinks
      .filter((l) => l.href.startsWith("#") && l.href !== "#home")
      .map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !headerRef.current) return;

    const header = headerRef.current;
    gsap.set(header, { y: -100, opacity: 0 });

    const loadTl = gsap.timeline();
    loadTl.to(header, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      force3D: true,
    });

    const scrollTl = gsap.timeline({ paused: true });
    scrollTl.to(header, {
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      duration: 0.3,
      ease: "power2.out",
    });

    const st = ScrollTrigger.create({
      start: "50px top",
      end: "max",
      onUpdate: (self) => {
        if (self.direction === 1 && self.scroll() > 80) {
          scrollTl.play();
        } else if (self.direction === -1 && self.scroll() < 50) {
          scrollTl.reverse();
        }
      },
    });

    return () => {
      loadTl.kill();
      scrollTl.kill();
      st.kill();
    };
  }, []);

  const navContent = (
    <>
      {siteConfig.navLinks.map((link) => {
        const id = link.href.slice(1);
        const isActive = activeSection === id || (link.href === "#home" && !activeSection);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              "relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              isActive && "text-foreground"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-border/50 glass transition-[backdrop-filter] duration-300"
    >
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="#home"
          className="font-heading text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">{navContent}</nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden md:inline-flex" />
          <Link href="#contact" className="hidden md:inline-flex">
            <Button size="sm" className="rounded-lg shadow-sm">
              Hire Me
            </Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex items-center gap-4">
                <ThemeToggle />
                <Link href="#contact" className="flex-1">
                  <Button className="w-full">Hire Me</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
