import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DesignSystemNav } from "@/components/design-system/DesignSystemNav";
import { ChevronLeft } from "lucide-react";
import { DeckThumbnailGradient } from "@/components/deck/DeckThumbnailGradient";

export default function ComponentsPage() {
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
              <span className="text-muted-foreground">Presentations</span> / Design System
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
              <h2 className="text-3xl font-bold mb-2">Components</h2>
              <p className="text-muted-foreground">
                Reusable UI components built with shadCN
              </p>
            </div>

            {/* Buttons */}
            <div id="buttons" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Buttons</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>shadCN button variants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cards */}
            <div id="cards" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Cards</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Card Component</CardTitle>
                  <CardDescription>shadCN card component</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is an example card component used throughout the system.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Thumbnail Card Pattern */}
            <div id="thumbnail-card" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Thumbnail Card Pattern</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Deck Thumbnail Card</CardTitle>
                  <CardDescription>
                    Interactive card pattern with gradient thumbnail and hover border effect
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Documentation */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      This pattern is used for deck thumbnails on the home page. It features:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
                      <li>A gradient thumbnail area using the DeckThumbnailGradient component</li>
                      <li>A blue border hover effect (sky-500 for both light and dark modes)</li>
                      <li>Card content with title, description, and footer</li>
                    </ul>
                  </div>

                  {/* Interactive Example */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Interactive Example</h4>
                    <p className="text-xs text-muted-foreground">
                      Hover over the card below to see the blue border effect:
                    </p>
                    
                    {/* Thumbnail Card Example - using the same pattern as home page */}
                    <div className="deck-thumbnail-wrapper block max-w-sm">
                      <Card className="h-full transition-all cursor-pointer flex flex-col bg-card">
                        {/* Thumbnail container - uses same gradient as title slide */}
                        <div className="px-6">
                          <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl bg-muted">
                            {/* Same gradient component used in TitleSlide */}
                            <DeckThumbnailGradient className="rounded-xl" />
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>Example Deck</CardTitle>
                          <CardDescription>
                            This is an example deck card showing the thumbnail pattern
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto border-t pt-4">
                          <span className="text-xs text-muted-foreground">
                            Created Dec 19, 2024
                          </span>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>

                  {/* Implementation Details */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Implementation Details</h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        <strong>Wrapper Class:</strong> Use <code className="bg-muted px-1 py-0.5 rounded">deck-thumbnail-wrapper</code> on the Link or container element
                      </p>
                      <p>
                        <strong>Hover Effect:</strong> The blue border is created using CSS pseudo-elements (<code className="bg-muted px-1 py-0.5 rounded">::before</code> and <code className="bg-muted px-1 py-0.5 rounded">::after</code>) defined in <code className="bg-muted px-1 py-0.5 rounded">globals.css</code>
                      </p>
                      <p>
                        <strong>Border Color:</strong> 
                        <span className="ml-1">sky-500 (#0ea5e9) for both light and dark modes</span>
                      </p>
                      <p>
                        <strong>Gradient:</strong> The DeckThumbnailGradient component uses theme-aware chart colors that match the TitleSlide gradient
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

