interface Column {
  heading: string;
  body?: string;
  bullets?: string[];
}

interface ThreeColumnSlideProps {
  title?: string;
  columns: Column[];
}

export function ThreeColumnSlide({ title, columns }: ThreeColumnSlideProps) {
  return (
    <div className="h-full flex flex-col px-12 pt-8 pb-20">
      {title && (
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          {title}
        </h2>
      )}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-6">
        {columns.map((column, index) => (
          <div
            key={index}
            className="flex flex-col h-full bg-card rounded-xl border border-border p-6 shadow-sm"
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              {column.heading}
            </h3>
            {column.bullets && column.bullets.length > 0 ? (
              <ul className="space-y-2 flex-1">
                {column.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    className="text-base md:text-lg text-muted-foreground leading-relaxed flex items-start"
                  >
                    <span className="mr-3 text-primary mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {column.body}
              </p>
            )}
          </div>
        ))}
      </div>
      {/* Horizontal bar card below columns */}
      <div className="w-full bg-muted rounded-xl border border-border p-4 shadow-sm">
        <p className="text-base md:text-lg text-center text-muted-foreground">
          Connect with stakeholders in a centralized Notion or prototype hub or both
        </p>
      </div>
    </div>
  );
}

