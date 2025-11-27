import Image from "next/image";

interface ImageSlideProps {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
}

export function ImageSlide({ src, alt, caption, title }: ImageSlideProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 py-6">
      {title && (
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">{title}</h2>
      )}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="relative w-full h-full max-w-5xl">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      </div>
      {caption && (
        <p className="text-lg md:text-xl text-muted-foreground mt-4 text-center">
          {caption}
        </p>
      )}
    </div>
  );
}

