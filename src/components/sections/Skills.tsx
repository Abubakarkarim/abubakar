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
    <section id="skills" className="border-b border-border/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
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
          {skillsData.map((category, catIndex) => (
            <motion.div key={category.name} variants={item}>
              <Card className="glass-card h-full border-border/50 transition-shadow hover:shadow-lg">
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
