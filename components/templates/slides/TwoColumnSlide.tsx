interface Column {
  heading: string;
  body?: string;
  bullets?: string[];
}

interface TwoColumnSlideProps {
  title?: string;
  columns: Column[];
  showBottomBar?: boolean;
}

export function TwoColumnSlide({ title, columns, showBottomBar = true }: TwoColumnSlideProps) {
  // Check if this is a comparison layout (exactly 2 columns with matching bullet counts)
  const isComparison = columns.length === 2 && 
    columns[0].bullets && columns[1].bullets && 
    columns[0].bullets.length === columns[1].bullets.length;

  return (
    <div className="h-full flex flex-col px-12 pt-8 pb-20">
      {title && (
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
          {title}
        </h2>
      )}
      
      {isComparison ? (
        // Comparison layout: card-per-comparison with headers and connectors
        <div className="flex-1 flex flex-col gap-4 mb-6">
          {/* Column headers at top */}
          <div className="grid grid-cols-2 gap-6 mb-2">
            {columns.map((column, index) => (
              <h3 key={index} className="text-xl md:text-2xl font-semibold text-center">
                {column.heading}
              </h3>
            ))}
          </div>
          {/* Comparison cards with connectors */}
          {columns[0].bullets!.map((_, bulletIndex) => (
            <div
              key={bulletIndex}
              className="bg-card rounded-xl border border-border p-6 shadow-sm relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col items-center text-center">
                    <p className="text-base md:text-lg text-foreground leading-relaxed">
                      {column.bullets![bulletIndex]}
                    </p>
                  </div>
                ))}
              </div>
              {/* Visual connector arrow between columns */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <div className="flex items-center">
                  <div className="w-8 h-0.5 bg-primary/40"></div>
                  <div className="w-0 h-0 border-l-[6px] border-l-primary/40 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Standard two-column layout
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-6">
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
      )}
      
      {/* Horizontal bar card below columns */}
      {showBottomBar && (
        <div className="w-full bg-muted rounded-xl border border-border p-4 shadow-sm">
          <p className="text-base md:text-lg text-center text-muted-foreground">
            Connect with stakeholders in a centralized Notion or prototype hub or both
          </p>
        </div>
      )}
    </div>
  );
}

