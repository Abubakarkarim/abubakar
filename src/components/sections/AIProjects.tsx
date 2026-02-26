"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiProjectsData } from "@/lib/constants/ai-projects";

export function AIProjects() {
  return (
    <section id="ai-projects" className="border-b border-border/40 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center gap-2 text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-600 dark:text-violet-400">
            <Sparkles className="h-4 w-4" />
            AI-Powered
          </span>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            AI Projects
          </h2>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {aiProjectsData.map((project, index) => (
            <AIProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AIProjectCard({
  project,
  index,
}: {
  project: (typeof aiProjectsData)[0];
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="glass-card h-full overflow-hidden border-border/50 transition-all hover:shadow-lg hover:border-violet-500/20">
        <div className="relative h-48 w-full bg-muted/50">
          {!imgError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500/15 to-cyan-500/15 text-4xl font-bold text-muted-foreground">
            AI
          </div>
          <div className="absolute right-2 top-2">
            <Badge className="bg-violet-500/90 text-white">AI</Badge>
          </div>
        </div>
        <CardHeader>
          <h3 className="font-heading text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs font-normal">
                {tech}
              </Badge>
            ))}
          </div>
          {project.features && project.features.length > 0 && (
            <ul className="text-xs text-muted-foreground">
              {project.features.map((f) => (
                <li key={f} className="flex gap-1.5">
                  <span className="text-violet-500">•</span> {f}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="gap-2">
          {project.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button size="sm" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
