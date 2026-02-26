import type { SkillCategory } from "@/lib/types";

export const skillsData: SkillCategory[] = [
  {
    name: "Frontend",
    items: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Angular" },
      { name: "Vue.js" },
      { name: "TypeScript" },
      { name: "JavaScript (ES6+)" },
      { name: "Tailwind CSS" },
      { name: "ShadCN UI" },
      { name: "Material UI" },
      { name: "Ant Design" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "Ruby on Rails" },
    ],
  },
  {
    name: "Database",
    items: [
      { name: "MongoDB" },
      { name: "Prisma" },
      { name: "PostgreSQL" },
      { name: "MySQL" },
    ],
  },
  {
    name: "AI Skills",
    items: [
      { name: "OpenAI API Integration" },
      { name: "ChatGPT Integration" },
      { name: "AI Chatbot Development" },
      { name: "AI SaaS Applications" },
      { name: "Prompt Engineering" },
      { name: "AI Automation Tools" },
    ],
  },
  {
    name: "Tools & Other",
    items: [
      { name: "MERN Stack" },
      { name: "REST APIs" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Deployment (Vercel, Netlify, Render)" },
      { name: "Domain & Hosting Setup" },
    ],
  },
];
