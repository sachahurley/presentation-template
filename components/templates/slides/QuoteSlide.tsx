interface QuoteSlideProps {
  quote: string;
  attribution?: string;
}

export function QuoteSlide({ quote, attribution }: QuoteSlideProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-12 py-8">
      <blockquote className="text-3xl md:text-4xl font-medium italic text-center mb-8 max-w-4xl">
        "{quote}"
      </blockquote>
      {attribution && (
        <p className="text-xl md:text-2xl text-muted-foreground">— {attribution}</p>
      )}
    </div>
  );
}

