# Abdul Haseeb – Personal Portfolio

A premium, modern, and recruiter-level personal portfolio website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and ShadCN UI. Features dark/light mode, glassmorphism, smooth animations, and full responsiveness.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** ShadCN UI (Radix UI primitives)
- **Icons:** Lucide React
- **Theme:** next-themes (dark/light)

## Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

## Getting Started

1. **Clone and install dependencies**

   ```bash
   cd abdul-haseeb
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

3. **Build for production**

   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
src/
├── app/                 # App Router: layout, page, globals, metadata
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/       # Hero, About, Skills, Experience, Projects, etc.
│   └── ui/             # ShadCN-style components
├── lib/
│   ├── constants/      # skills, experience, projects, testimonials, etc.
│   ├── site-config.ts  # Site and social config
│   └── utils.ts        # cn() and helpers
└── public/             # Static assets (avatar, resume, favicon)
```

## Customization

- **Content:** Edit `src/lib/site-config.ts` and files in `src/lib/constants/`.
- **Images:** Add `avatar.jpg` and `about.jpg` in `public/` for Hero and About sections. Replace project images in `public/projects/` or update paths in constants.
- **Resume:** Place your PDF at `public/resume.pdf` for the Download Resume button.
- **Social links:** Update `siteConfig.social` in `src/lib/site-config.ts` with your GitHub, LinkedIn, and email.

## Environment Variables

Optional: if you add a contact form API (e.g. Resend), create `.env.local` and add:

```
RESEND_API_KEY=your_key
```

## Deployment

Deploy on [Vercel](https://vercel.com) (recommended), Netlify, or any Node.js host:

```bash
npm run build
```

Then point your host to the build output and start command (`npm start` for Next.js standalone or the host’s default).

## License

MIT
