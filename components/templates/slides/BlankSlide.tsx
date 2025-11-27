interface BlankSlideProps {
  children?: React.ReactNode;
}

export function BlankSlide({ children }: BlankSlideProps) {
  return (
    <div className="h-full flex items-center justify-center px-8 py-6">
      {children || (
        <div className="text-muted-foreground text-lg">
          Blank slide - add your content here
        </div>
      )}
    </div>
  );
}

