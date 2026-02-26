"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialsData } from "@/lib/constants/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-border/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
        >
          What Others Say
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((t, index) => (
            <motion.div
              key={t.name + t.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card h-full border-border/50">
                <CardContent className="pt-6">
                  <Quote className="mb-4 h-10 w-10 text-primary/40" />
                  <p className="text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 border-t border-border/50 pt-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
