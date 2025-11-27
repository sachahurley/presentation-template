import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface Slide {
  id: number;
  type: "title" | "content";
  title: string;
  subtitle?: string;
  content?: string;
}

interface SlideTemplateProps {
  slide: Slide;
}

export function SlideTemplate({ slide }: SlideTemplateProps) {
  if (slide.type === "title") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-3xl">
          <h1 className="text-5xl font-bold">{slide.title}</h1>
          {slide.subtitle && (
            <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{slide.title}</CardTitle>
      </CardHeader>
      {slide.content && (
        <CardContent>
          <p className="text-lg text-muted-foreground whitespace-pre-line">
            {slide.content}
          </p>
        </CardContent>
      )}
    </Card>
  );
}

