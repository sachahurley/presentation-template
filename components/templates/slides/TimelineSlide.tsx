import { LucideIcon } from "lucide-react";

interface TimelineItem {
  label: string;
  icon?: LucideIcon;
  description?: string;
}

interface TimelineSlideProps {
  title?: string;
  items: TimelineItem[];
  timeIndicator?: string;
}

export function TimelineSlide({ title, items, timeIndicator }: TimelineSlideProps) {
  return (
    <div className="h-full flex flex-col px-12 py-8">
      {title && (
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">{title}</h2>
      )}
      
      <div className="flex-1 flex flex-col justify-center">
        {/* Timeline container */}
        <div className="relative">
          {/* Horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          {/* Timeline items */}
          <div className="relative flex justify-between items-center">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center relative z-10"
                style={{ flex: 1 }}
              >
                {/* Icon circle */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border-2 border-primary flex items-center justify-center mb-4 shadow-sm">
                  {item.icon ? (
                    <item.icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  ) : (
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary" />
                  )}
                </div>
                
                {/* Label */}
                <div className="text-center max-w-[120px] md:max-w-[150px]">
                  <p className="text-sm md:text-base font-semibold mb-1">{item.label}</p>
                  {item.description && (
                    <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Time indicator */}
        {timeIndicator && (
          <div className="mt-8 text-center">
            <p className="text-lg md:text-xl text-muted-foreground">{timeIndicator}</p>
          </div>
        )}
      </div>
    </div>
  );
}


