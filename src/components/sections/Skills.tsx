"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillsData } from "@/lib/constants/skills";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function Skills() {
  return (
    <section id="skills" className="border-b border-border/50 py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-label text-center"
        >
          Technologies
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title mb-14 text-center"
        >
          Skills
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillsData.map((category) => (
            <motion.div key={category.name} variants={item}>
              <Card className="glass-card card-hover h-full border-border/50">
                <CardHeader className="pb-2">
                  <h3 className="font-heading text-lg font-semibold">
                    {category.name}
                  </h3>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className={cn(
                        "font-normal text-xs"
                      )}
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
