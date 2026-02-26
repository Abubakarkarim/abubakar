export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

export interface ProjectItem {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface SkillCategory {
  name: string;
  items: { name: string; icon?: string }[];
}
