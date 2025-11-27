interface TitleSlideProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string; // Optional background image (data URL or regular URL)
}

export function TitleSlide({ title, subtitle, backgroundImage }: TitleSlideProps) {
  return (
    <div 
      className="h-full flex flex-col items-center justify-center text-center px-8 relative"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }
          : undefined
      }
    >
      {/* Optional overlay for better text readability when background is present */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-background/10 dark:bg-background/15" />
      )}
      
      {/* Content layer - positioned above background */}
      <div className="relative z-10">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">{title}</h1>
        {subtitle && (
          <p className="text-2xl md:text-3xl text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

