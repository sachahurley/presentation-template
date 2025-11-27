interface BulletListSlideProps {
  title?: string;
  items: string[];
}

export function BulletListSlide({ title, items }: BulletListSlideProps) {
  return (
    <div className="h-full flex flex-col px-12 py-8">
      {title && (
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">{title}</h2>
      )}
      <ul className="flex-1 flex flex-col justify-center space-y-4">
        {items.map((item, index) => (
          <li key={index} className="text-xl md:text-2xl flex items-start">
            <span className="mr-4 text-primary">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

