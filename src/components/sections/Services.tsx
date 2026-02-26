"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Brain,
  Globe,
  Code,
  Rocket,
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
};

export function Services() {
  return (
    <section id="services" className="border-b border-border/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
        >
          Services
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Layers;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="glass-card h-full border-border/50 transition-all hover:shadow-lg hover:border-primary/20">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
