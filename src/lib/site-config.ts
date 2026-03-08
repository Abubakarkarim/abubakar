export const siteConfig = {
  name: "Abubakar",
  title: "Senior Full Stack Software Engineer | AI-Integrated Web Developer",
  location: "Lahore, Pakistan",
  phone: "+92 312 6518518",
  email: "abubakarkarim206@gmail.com",
  experience: "5+ Years",
  projectsCompleted: "40+",
  baseUrl: "https://abubakar-dev.vercel.app",
  // Note: file in /public is named 'Resume.pdf' (case-sensitive in production)
  resumeUrl: "/Resume.pdf",
  social: {
    github: "https://github.com/abubakar",
    linkedin: "https://www.linkedin.com/in/abubakar-karim-068056155/",
    email: "mailto:abubakarkarim206@gmail.com",
  },
  navLinks: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ],
  summary:
    "I am a Senior Full Stack Software Engineer with 5+ years of experience building scalable, high-performance, and AI-powered web applications. I specialize in modern frontend frameworks, backend systems, and AI integrations using OpenAI APIs and intelligent automation. I have worked on international projects including Saudi Arabia, UAE, China, Canada, USA, and other markets. Open to remote opportunities.",
  focus: [
    "Performance",
    "Scalability",
    "Clean Architecture",
    "AI Integration",
    "Excellent User Experience",
  ],
  typingTitles: [
    "Full Stack Engineer",
    "AI Engineer",
    "Next.js Developer",
    "Ruby on Rails Developer",
    "React Developer",
    "MERN Stack Developer",
  ],
  education: {
    school: "COMSATS University Lahore",
    degree: "Bachelor in Computer Science",
    duration: "2017 – 2021",
  },
  languages: [
    { name: "Urdu", level: "Fluent" },
    { name: "English", level: "Intermediate" },
    { name: "Punjabi", level: "Intermediate" },
  ],
} as const;
