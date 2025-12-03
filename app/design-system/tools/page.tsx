import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DesignSystemNav } from "@/components/design-system/DesignSystemNav";
import { ChevronLeft } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-semibold">
              <span className="text-muted-foreground">Presento</span> / Design System / Tools
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex pt-16">
        {/* Navigation Sidebar */}
        <aside className="hidden md:block fixed top-16 left-0 bottom-0">
          <DesignSystemNav />
        </aside>

        {/* Content Area */}
        <main className="flex-1 md:pl-64 overflow-y-auto">
          <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-2">Tools</h2>
              <p className="text-muted-foreground">
                Interactive debugging and testing tools for design system components
              </p>
            </div>

            {/* Tool Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <Link href="/design-system/tools/glow-trail-debug" className="deck-thumbnail-wrapper block">
                <Card className="h-full transition-all cursor-pointer flex flex-col bg-card">
                  <CardHeader>
                    <CardTitle>Glow Trail Debug</CardTitle>
                    <CardDescription>
                      Interactive tool to adjust and preview the animated glow trail button effect
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

