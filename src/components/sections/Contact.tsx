"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/gsapConfig";
import { prefersReducedMotion } from "@/lib/gsap/prefersReducedMotion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

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
      if (leftRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              leftRef.current,
              { x: -100, opacity: 0, force3D: true },
              { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", force3D: true }
            );
          },
        });
      }
      if (formRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              formRef.current,
              { x: 100, opacity: 0, force3D: true },
              { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", force3D: true }
            );
          },
        });
      }
    }, sectionRef);

    let btnCleanup: (() => void) | undefined;
    if (submitBtnRef.current && typeof window !== "undefined" && !prefersReducedMotion()) {
      const btn = submitBtnRef.current;
      const onEnter = () => {
        gsap.to(btn, { scale: 1.05, duration: 0.2, ease: "power2.out", force3D: true });
      };
      const onLeave = () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "back.out(1.7)", force3D: true });
      };
      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);
      btnCleanup = () => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
      };
    }

    return () => {
      btnCleanup?.();
      ctx.revert();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string)?.trim() ?? "";
    const email = (data.get("email") as string)?.trim() ?? "";
    const message = (data.get("message") as string)?.trim() ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setErrorMessage(null);
      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage("Network error. You can email me directly.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="border-b border-border/50 py-24 md:py-32"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <p ref={labelRef} className="section-label text-center">
          Contact
        </p>
        <h2 ref={headingRef} className="section-title mb-14 text-center">
          Get In Touch
        </h2>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div ref={leftRef} className="space-y-6">
              <p className="text-muted-foreground">
                Have a project in mind or want to work together? Send a message and
                I&apos;ll get back to you soon.
              </p>
              <div className="space-y-4">
                <a
                  href={siteConfig.social.email}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-5 w-5" />
                  <span>{siteConfig.email}</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Phone className="h-5 w-5" />
                  <span>{siteConfig.phone}</span>
                </a>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{siteConfig.location}</span>
                </p>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={5}
                  required
                />
              </div>
              <Button
                ref={submitBtnRef}
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  "Sending..."
                ) : status === "sent" ? (
                  "Sent!"
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
              {status === "error" && (
                <p className="text-sm text-destructive">
                  {errorMessage ?? "Something went wrong."} You can email me directly at{" "}
                  <a href={siteConfig.social.email} className="underline">{siteConfig.email}</a>.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
