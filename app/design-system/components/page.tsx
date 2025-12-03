"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DesignSystemNav } from "@/components/design-system/DesignSystemNav";
import { ChevronLeft, Plus, Trash2, Edit, Settings } from "lucide-react";
import { DeckThumbnailGradient } from "@/components/deck/DeckThumbnailGradient";
import { useToast } from "@/components/ui/toast";

export default function ComponentsPage() {
  const { addToast } = useToast();

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
                <CardContent className="space-y-6">
                  {/* Variants */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Variants</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Link</Button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Sizes</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm" variant="outline">Small Outline</Button>
                      <Button size="default" variant="outline">Default Outline</Button>
                      <Button size="lg" variant="outline">Large Outline</Button>
                    </div>
                  </div>

                  {/* Icon Only */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Icon Only</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="icon-sm" variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon-lg" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="icon-sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon-lg">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="icon-sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon-lg" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* With Icons */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">With Icons</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button>
                        <Plus className="h-4 w-4" />
                        Add Item
                      </Button>
                      <Button variant="outline">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inputs */}
            <div id="inputs" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Inputs</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Input Variants</CardTitle>
                  <CardDescription>
                    Input fields matching button heights for consistent UI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Sizes */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Sizes</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Small (h-8)</label>
                        <Input size="sm" placeholder="Small input" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Default (h-9)</label>
                        <Input placeholder="Default input" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Large (h-10)</label>
                        <Input size="lg" placeholder="Large input" />
                      </div>
                    </div>
                  </div>

                  {/* States */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">States</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Default</label>
                        <Input placeholder="Enter text..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">With Value</label>
                        <Input defaultValue="Sample text value" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Disabled</label>
                        <Input placeholder="Disabled input" disabled />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Error State</label>
                        <Input 
                          variant="error" 
                          placeholder="Invalid input" 
                          defaultValue="Invalid value"
                          aria-invalid="true"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Comparison with Buttons */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Height Matching</h4>
                    <p className="text-xs text-muted-foreground">
                      Inputs are designed to match button heights for visual consistency
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Input size="sm" placeholder="Small input" className="w-48" />
                        <Button size="sm">Small Button</Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Default input" className="w-48" />
                        <Button>Default Button</Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input size="lg" placeholder="Large input" className="w-48" />
                        <Button size="lg">Large Button</Button>
                      </div>
                    </div>
                  </div>

                  {/* Textarea Variant */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Textarea</h4>
                    <p className="text-xs text-muted-foreground">
                      Multi-line text input with the same styling as regular inputs
                    </p>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Default</label>
                        <Textarea placeholder="Enter multiple lines of text..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">With Value</label>
                        <Textarea defaultValue="This is a sample textarea with some content. It demonstrates how the textarea looks with text inside." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Disabled</label>
                        <Textarea placeholder="Disabled textarea" disabled />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-muted-foreground">Error State</label>
                        <Textarea 
                          variant="error" 
                          placeholder="Invalid textarea" 
                          defaultValue="This textarea has an error"
                          aria-invalid="true"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Toasts */}
            <div id="toasts" className="mb-12 scroll-mt-8">
              <h3 className="text-xl font-semibold mb-4">Toasts</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Toast Notifications</CardTitle>
                  <CardDescription>
                    Toast notifications for user feedback and actions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Documentation */}
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Toast notifications appear in the bottom-right corner and provide feedback for user actions. They feature:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
                      <li>Slide-up animation from bottom, pause, then slide back down</li>
                      <li>Card-style appearance with elevation 5 shadow</li>
                      <li>Contextual icons on the left side based on variant (delete, success, info, warning)</li>
                      <li>Theme-aware styling (light/dark mode)</li>
                      <li>Automatic stacking when multiple toasts are triggered</li>
                      <li>4-second display duration by default</li>
                    </ul>
                  </div>

                  {/* Interactive Example */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold">Interactive Example</h4>
                    <p className="text-xs text-muted-foreground">
                      Click the buttons below to trigger toast notifications with contextual icons:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => addToast("This is a default toast notification", 4000, "default")}
                        variant="outline"
                        size="sm"
                      >
                        Default Toast
                      </Button>
                      <Button
                        onClick={() => addToast("Deck has been deleted", 4000, "delete")}
                        variant="outline"
                        size="sm"
                      >
                        Delete Toast
                      </Button>
                      <Button
                        onClick={() => addToast("Changes saved successfully!", 4000, "success")}
                        variant="outline"
                        size="sm"
                      >
                        Success Toast
                      </Button>
                      <Button
                        onClick={() => addToast("New feature available", 4000, "info")}
                        variant="outline"
                        size="sm"
                      >
                        Info Toast
                      </Button>
                      <Button
                        onClick={() => addToast("Please review before continuing", 4000, "warning")}
                        variant="outline"
                        size="sm"
                      >
                        Warning Toast
                      </Button>
                      <Button
                        onClick={() => {
                          addToast("Your deck has been successfully saved to local storage. You can now access it from the home page and make further edits whenever you need.", 5000, "success");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Long Body Copy Toast
                      </Button>
                      <Button
                        onClick={() => {
                          addToast("First toast", 4000, "success");
                          setTimeout(() => addToast("Second toast", 4000, "info"), 300);
                          setTimeout(() => addToast("Third toast", 4000, "warning"), 600);
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Show Multiple Toasts
                      </Button>
                    </div>
                  </div>

                  {/* Implementation Details */}
                  <div className="space-y-3 pt-4 border-t">
                    <h4 className="text-sm font-semibold">Implementation Details</h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        <strong>Usage:</strong> Import <code className="bg-muted px-1 py-0.5 rounded">useToast</code> hook and call <code className="bg-muted px-1 py-0.5 rounded">addToast(message, duration, variant)</code>
                      </p>
                      <p>
                        <strong>Variants:</strong> <code className="bg-muted px-1 py-0.5 rounded">"default"</code>, <code className="bg-muted px-1 py-0.5 rounded">"delete"</code> (trash icon), <code className="bg-muted px-1 py-0.5 rounded">"success"</code> (checkmark), <code className="bg-muted px-1 py-0.5 rounded">"info"</code> (info icon), <code className="bg-muted px-1 py-0.5 rounded">"warning"</code> (alert icon)
                      </p>
                      <p>
                        <strong>Icons:</strong> Contextual icons appear on the left side with variant-specific colors (destructive for delete, green for success, blue for info, yellow for warning)
                      </p>
                      <p>
                        <strong>Position:</strong> Fixed bottom-right (<code className="bg-muted px-1 py-0.5 rounded">bottom-4 right-4</code>)
                      </p>
                      <p>
                        <strong>Styling:</strong> Simpler card variant with less padding (<code className="bg-muted px-1 py-0.5 rounded">px-4 py-3</code>)
                      </p>
                      <p>
                        <strong>Animation:</strong> 300ms transition with slide-up and slide-down effects
                      </p>
                      <p>
                        <strong>Stacking:</strong> Multiple toasts automatically stack vertically with gap spacing
                      </p>
                    </div>
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

