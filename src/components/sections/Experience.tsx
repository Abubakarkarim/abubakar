"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/lib/constants/experience";
import { Briefcase } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-12 text-center"
        >
          Experience
        </motion.h2>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />
          <div className="space-y-12">
            {experienceData.map((job, index) => (
              <motion.div
                key={job.company + job.duration}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex gap-8 md:gap-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative z-10 ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background md:ml-0 md:left-1/2 md:-translate-x-1/2">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div
                  className={`ml-4 flex-1 md:ml-0 ${
                    index % 2 === 1 ? "md:text-right md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="rounded-xl border border-border/50 bg-card/50 p-6 shadow-sm">
                    <p className="text-sm font-medium text-primary">
                      {job.duration}
                    </p>
                    <h3 className="font-heading mt-1 text-xl font-semibold">
                      {job.position}
                    </h3>
                    <p className="text-muted-foreground">{job.company}</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {job.responsibilities.map((r) => (
                        <li
                          key={r}
                          className={`flex gap-2 ${
                            index % 2 === 1 ? "md:flex-row-reverse" : ""
                          }`}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
