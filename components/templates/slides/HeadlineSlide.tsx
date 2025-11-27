interface HeadlineSlideProps {
  headline: string;
}

export function HeadlineSlide({ headline }: HeadlineSlideProps) {
  return (
    <div className="h-full flex items-center justify-center px-8">
      <h1 className="text-5xl md:text-6xl font-bold text-center">{headline}</h1>
    </div>
  );
}

