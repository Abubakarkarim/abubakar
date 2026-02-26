"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="border-b border-border/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square max-h-[400px] w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/30 lg:max-h-none"
          >
            {!imgError ? (
              <Image
                src="/about.jpg"
                alt="Abdul Haseeb"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImgError(true)}
              />
            ) : null}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/10 to-cyan-500/10 text-6xl font-bold text-muted-foreground">
              AH
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-3xl font-bold tracking-tight sm:text-4xl"
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground leading-relaxed"
            >
              {siteConfig.summary}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <p className="text-sm font-semibold">I focus on:</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {siteConfig.focus.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground"
            >
              <p>
                <span className="font-semibold text-foreground">Education:</span>{" "}
                {siteConfig.education.school} — {siteConfig.education.degree} ({siteConfig.education.duration})
              </p>
              <p>
                <span className="font-semibold text-foreground">Languages:</span>{" "}
                {siteConfig.languages.map((l) => `${l.name} (${l.level})`).join(", ")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
