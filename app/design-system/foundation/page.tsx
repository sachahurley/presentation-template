import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DesignSystemNav } from "@/components/design-system/DesignSystemNav";
import { ChevronLeft } from "lucide-react";

export default function FoundationPage() {
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
              <span className="text-muted-foreground">Presento</span> / Design System
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
              <h2 className="text-3xl font-bold mb-2">Foundation</h2>
              <p className="text-muted-foreground">
                Core design tokens including colors, typography, elevation, and theme settings
              </p>
            </div>

            {/* Colors */}
            <div id="colors" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Colors</h3>
              <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Light Mode</CardTitle>
                    <CardDescription>Primary background: sky-100</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-16 rounded-md bg-sky-100 border border-border"></div>
                      <p className="text-sm text-muted-foreground">sky-100</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Dark Mode</CardTitle>
                    <CardDescription>Primary background: sky-950</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-16 rounded-md bg-sky-950 border border-border"></div>
                      <p className="text-sm text-muted-foreground">sky-950</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sky Color Swatches */}
              <Card>
                <CardHeader>
                  <CardTitle>Sky Color Palette</CardTitle>
                  <CardDescription>Complete sky color scale from 100 to 950</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-100 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-100</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-200 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-200</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-300 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-300</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-400 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-400</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-500 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-500</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-600 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-600</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-700 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-700</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-800 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-800</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-900 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-900</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-20 w-full rounded-md bg-sky-950 border border-border"></div>
                      <p className="text-sm text-muted-foreground text-center">sky-950</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Typography */}
            <div id="typography" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Typography</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Font Family</CardTitle>
                  <CardDescription>Inconsolata (monospace)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Regular (400)</p>
                    <p className="text-2xl font-normal">The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Medium (500)</p>
                    <p className="text-2xl font-medium">The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Semibold (600)</p>
                    <p className="text-2xl font-semibold">The quick brown fox jumps over the lazy dog</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Bold (700)</p>
                    <p className="text-2xl font-bold">The quick brown fox jumps over the lazy dog</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Theme */}
            <div id="theme" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Theme</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Dark / Light Mode</CardTitle>
                  <CardDescription>Toggle between light and dark themes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <p className="text-sm text-muted-foreground">
                      Use the toggle button to switch between light and dark modes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Elevation */}
            <div id="elevation" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Elevation</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Elevation (Shadows)</CardTitle>
                  <CardDescription>
                    Tailwind CSS shadow utilities to create depth and hierarchy using box shadows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* shadow-none - No shadow */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">No Shadow</p>
                        <p className="text-xs text-muted-foreground">
                          Used in: Flat surfaces, resting states
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">shadow-none</code>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-32 h-24 bg-card border border-border rounded-lg shadow-none flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Example</span>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground">
                        Removes all shadows. Used for flat surfaces and elements without elevation.
                      </div>
                    </div>
                  </div>

                  {/* shadow-sm - Small */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Small Shadow</p>
                        <p className="text-xs text-muted-foreground">
                          Used in: Button outline variant, default card component
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">shadow-sm</code>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-32 h-24 bg-card border border-border rounded-lg shadow-sm flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Example</span>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground">
                        Subtle shadow for buttons, cards, and standard UI elements. Most commonly used shadow level.
                      </div>
                    </div>
                  </div>

                  {/* shadow - Default */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Default Shadow</p>
                        <p className="text-xs text-muted-foreground">
                          Used in: Standard elevated elements
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">shadow</code>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-32 h-24 bg-card border border-border rounded-lg shadow flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Example</span>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground">
                        Standard shadow for elevated elements. Provides moderate depth.
                      </div>
                    </div>
                  </div>

                  {/* shadow-md - Medium */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Medium Shadow</p>
                        <p className="text-xs text-muted-foreground">
                          Used in: Raised elements, interactive components
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">shadow-md</code>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-32 h-24 bg-card border border-border rounded-lg shadow-md flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Example</span>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground">
                        Medium shadow for raised elements and interactive components that need more prominence.
                      </div>
                    </div>
                  </div>

                  {/* shadow-lg - Large */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Large Shadow</p>
                        <p className="text-xs text-muted-foreground">
                          Used in: Hover states, slide previews, interactive cards
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">shadow-lg</code>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-32 h-24 bg-card border border-border rounded-lg shadow-lg flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Example</span>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground">
                        Large shadow for hover states, emphasized content, and elements that need strong elevation.
                      </div>
                    </div>
                  </div>

                  {/* shadow-xl - Extra Large */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Extra Large Shadow</p>
                        <p className="text-xs text-muted-foreground">
                          Used in: Floating action buttons, dialogs, high prominence elements
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">shadow-xl</code>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-32 h-24 bg-card border border-border rounded-lg shadow-xl flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Example</span>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground">
                        Extra large shadow for floating action buttons, dialogs, and high prominence overlays.
                      </div>
                    </div>
                  </div>

                  {/* shadow-2xl - 2X Large */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">2X Large Shadow</p>
                        <p className="text-xs text-muted-foreground">
                          Used in: Fullscreen presentation mode, modals, maximum prominence elements
                        </p>
                      </div>
                      <code className="text-xs bg-muted px-2 py-1 rounded">shadow-2xl</code>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-32 h-24 bg-card border border-border rounded-lg shadow-2xl flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">Example</span>
                      </div>
                      <div className="flex-1 text-xs text-muted-foreground">
                        Maximum shadow for fullscreen overlays, modals, and elements that must appear above all others.
                      </div>
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

