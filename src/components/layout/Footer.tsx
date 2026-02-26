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
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-heading text-base font-semibold text-foreground">{siteConfig.name}</p>
            <p className="text-sm text-muted-foreground max-w-xs">{siteConfig.title}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              {siteConfig.location}
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 text-sm">
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
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>

        <Separator className="my-8 bg-border/60" />

        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
