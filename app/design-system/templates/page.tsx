import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { DesignSystemNav } from "@/components/design-system/DesignSystemNav";
import { ChevronLeft } from "lucide-react";
import { TitleSlide } from "@/components/templates/slides/TitleSlide";
import { HeadlineSlide } from "@/components/templates/slides/HeadlineSlide";
import { SectionSlide } from "@/components/templates/slides/SectionSlide";
import { BulletListSlide } from "@/components/templates/slides/BulletListSlide";
import { QuoteSlide } from "@/components/templates/slides/QuoteSlide";
import { BlankSlide } from "@/components/templates/slides/BlankSlide";

export default function TemplatesPage() {
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
              <h2 className="text-3xl font-bold mb-2">Templates</h2>
              <p className="text-muted-foreground">
                Reusable slide templates for creating presentations. Each template accepts props for customization.
              </p>
            </div>

            <div className="space-y-8">
              {/* Title Slide */}
              <div id="title-slide" className="scroll-mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Title Slide</CardTitle>
                    <CardDescription>
                      Large title with optional subtitle. Use for deck opening slides.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-border rounded-lg p-4 bg-muted/50" style={{ aspectRatio: "16/9", minHeight: "300px" }}>
                      <TitleSlide
                        title="Example Title"
                        subtitle="This is an example subtitle"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm font-mono text-xs">
                        {`<TitleSlide title="Example Title" subtitle="Optional subtitle" />`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Headline Slide */}
              <div id="headline-slide" className="scroll-mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Headline Slide</CardTitle>
                    <CardDescription>
                      Single large headline text. Great for emphasis.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-border rounded-lg p-4 bg-muted/50" style={{ aspectRatio: "16/9", minHeight: "300px" }}>
                      <HeadlineSlide headline="This is a Big Headline" />
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm font-mono text-xs">
                        {`<HeadlineSlide headline="Your headline text" />`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Section Slide */}
              <div id="section-slide" className="scroll-mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Section Slide</CardTitle>
                    <CardDescription>
                      Section divider/header with optional description.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-border rounded-lg p-4 bg-muted/50" style={{ aspectRatio: "16/9", minHeight: "300px" }}>
                      <SectionSlide
                        title="Section Title"
                        description="Optional section description"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm font-mono text-xs">
                        {`<SectionSlide title="Section" description="Optional" />`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bullet List Slide */}
              <div id="bullet-list-slide" className="scroll-mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Bullet List Slide</CardTitle>
                    <CardDescription>
                      Content slide with bullet points. Optional title.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-border rounded-lg p-4 bg-muted/50" style={{ aspectRatio: "16/9", minHeight: "300px" }}>
                      <BulletListSlide
                        title="Key Points"
                        items={["First point", "Second point", "Third point"]}
                      />
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm font-mono text-xs">
                        {`<BulletListSlide title="Title" items={["Item 1", "Item 2"]} />`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quote Slide */}
              <div id="quote-slide" className="scroll-mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Quote Slide</CardTitle>
                    <CardDescription>
                      Large quote with optional attribution.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-border rounded-lg p-4 bg-muted/50" style={{ aspectRatio: "16/9", minHeight: "300px" }}>
                      <QuoteSlide
                        quote="The only way to do great work is to love what you do."
                        attribution="Steve Jobs"
                      />
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm font-mono text-xs">
                        {`<QuoteSlide quote="Quote text" attribution="Author" />`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Blank Slide */}
              <div id="blank-slide" className="scroll-mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Blank Slide</CardTitle>
                    <CardDescription>
                      Empty canvas for custom content. Accepts children.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-border rounded-lg p-4 bg-muted/50" style={{ aspectRatio: "16/9", minHeight: "300px" }}>
                      <BlankSlide>
                        <div className="text-center">
                          <p className="text-xl">Your custom content here</p>
                        </div>
                      </BlankSlide>
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <p className="text-sm font-mono text-xs">
                        {`<BlankSlide>{/* Your content */}</BlankSlide>`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

