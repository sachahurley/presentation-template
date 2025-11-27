interface SectionSlideProps {
  title: string;
  description?: string;
}

export function SectionSlide({ title, description }: SectionSlideProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-semibold mb-4">{title}</h2>
      {description && (
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

