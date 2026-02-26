import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://abdul-haseeb-dev.vercel.app"),
  title: "Abdul Haseeb | Senior Full Stack Software Engineer",
  description:
    "Senior Full Stack Software Engineer with 5+ years of experience building scalable, high-performance, and AI-powered web applications. Based in Lahore, Pakistan.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "AI Integration",
    "Lahore",
    "Pakistan",
    "MERN Stack",
    "TypeScript",
  ],
  authors: [{ name: "Abdul Haseeb", url: "https://abdul-haseeb-dev.vercel.app" }],
  openGraph: {
    title: "Abdul Haseeb | Senior Full Stack Software Engineer",
    description:
      "Senior Full Stack Software Engineer with 5+ years of experience. AI-integrated web development. Lahore, Pakistan.",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Haseeb | Senior Full Stack Software Engineer",
    description: "5+ years building scalable, AI-powered web applications.",
    images: ["/opengraph-image"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
