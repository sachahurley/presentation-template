import { LucideIcon } from "lucide-react";

interface IconItem {
  text: string;
  icon?: LucideIcon;
}

interface IconListSlideProps {
  title?: string;
  items: IconItem[];
}

export function IconListSlide({ title, items }: IconListSlideProps) {
  return (
    <div className="h-full flex flex-col px-12 py-8">
      {title && (
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">{title}</h2>
      )}
      <ul className="flex-1 flex flex-col justify-center space-y-6 md:space-y-8">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-6">
            {/* Icon container */}
            {item.icon && (
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg bg-card border border-border flex items-center justify-center shadow-sm">
                <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
            )}
            {/* Text content */}
            <div className="flex-1 flex items-center">
              <span className="text-xl md:text-2xl leading-relaxed">{item.text}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

