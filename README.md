# Abubakar – Personal Portfolio

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
   cd abubakar
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

Copy `.env.example` to `.env.local` and fill in your values. Required for the contact form (Nodemailer):

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | Port (e.g. `587`) |
| `SMTP_USER` | Your email / SMTP username |
| `SMTP_PASS` | SMTP password (for Gmail, use an [App Password](https://myaccount.google.com/apppasswords)) |
| `SMTP_FROM` | Optional. From address shown in emails |
| `CONTACT_EMAIL` | Where to receive messages (defaults to your site email) |
| `NEXT_PUBLIC_BASE_URL` | Optional. Site URL for metadata (e.g. `https://abubakar.dev`) |

Without these, the contact form will return a friendly error and users can still email you directly.

## Deployment

Deploy on [Vercel](https://vercel.com) (recommended), Netlify, or any Node.js host:

```bash
npm run build
```

Then point your host to the build output and start command (`npm start` for Next.js standalone or the host’s default).

## License

MIT
