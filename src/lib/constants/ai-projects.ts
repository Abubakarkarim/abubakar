import type { ProjectItem } from "@/lib/types";

export const aiProjectsData: ProjectItem[] = [
  {
    title: "AI SaaS Application",
    description:
      "Full stack AI SaaS platform using Next.js, Node.js, and OpenAI API. Delivers AI-powered features for content and automation.",
    image: "/projects/ai-saas.jpg",
    techStack: ["Next.js", "Node.js", "OpenAI API"],
    githubUrl: "#",
    liveUrl: "#",
    features: ["AI Chat", "AI Content Generator", "AI Automation"],
  },
  {
    title: "AI Chatbot",
    description:
      "Intelligent chatbot built with OpenAI API. Real-time conversation with context memory and seamless API integration.",
    image: "/projects/ai-chatbot.jpg",
    techStack: ["OpenAI API", "Node.js", "React"],
    githubUrl: "#",
    liveUrl: "#",
    features: ["Real-time chat", "Context memory", "API integration"],
  },
  {
    title: "AI Resume Analyzer",
    description:
      "Users upload their resume and receive AI-powered feedback. Analyzes structure, keywords, and suggests improvements.",
    image: "/projects/ai-resume.jpg",
    techStack: ["OpenAI API", "Next.js", "File upload"],
    githubUrl: "#",
    liveUrl: "#",
    features: ["Resume upload", "AI analysis", "Feedback report"],
  },
];
