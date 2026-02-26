"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site-config";
import { Separator } from "@/components/ui/separator";

const socialLinks = [
  { href: siteConfig.social.github, icon: Github, label: "GitHub" },
  { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.social.email, icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-heading text-sm font-semibold">{siteConfig.name}</p>
            <p className="text-xs text-muted-foreground">{siteConfig.title}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {siteConfig.location}
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 text-sm">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>

        <Separator className="my-6" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
