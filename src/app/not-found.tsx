import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
      <h1 className="font-heading text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">This page could not be found.</p>
      <Button asChild>
        <Link href="/">{siteConfig.name} — Back home</Link>
      </Button>
    </div>
  );
}
