"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;
    const mailto = `mailto:${siteConfig.email}?subject=Portfolio contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}\n\n---\nFrom: ${encodeURIComponent(email)}`;
    try {
      window.location.href = mailto;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-b border-border/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
        >
          Get In Touch
        </motion.h2>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
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
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
              <Button type="submit" size="lg" className="w-full gap-2" disabled={status === "sending"}>
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
                  Something went wrong. You can email me directly at {siteConfig.email}.
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
