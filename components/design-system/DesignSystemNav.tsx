"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    id: "foundation",
    label: "Foundation",
    href: "/design-system/foundation",
    children: [
      { id: "colors", label: "Colors", href: "/design-system/foundation#colors" },
      { id: "typography", label: "Typography", href: "/design-system/foundation#typography" },
      { id: "theme", label: "Theme", href: "/design-system/foundation#theme" },
      { id: "elevation", label: "Elevation", href: "/design-system/foundation#elevation" },
    ],
  },
  {
    id: "components",
    label: "Components",
    href: "/design-system/components",
    children: [
      { id: "buttons", label: "Buttons", href: "/design-system/components#buttons" },
      { id: "cards", label: "Cards", href: "/design-system/components#cards" },
    ],
  },
  {
    id: "templates",
    label: "Templates",
    href: "/design-system/templates",
    children: [
      { id: "title-slide", label: "Title Slide", href: "/design-system/templates#title-slide" },
      { id: "headline-slide", label: "Headline Slide", href: "/design-system/templates#headline-slide" },
      { id: "section-slide", label: "Section Slide", href: "/design-system/templates#section-slide" },
      { id: "bullet-list-slide", label: "Bullet List Slide", href: "/design-system/templates#bullet-list-slide" },
      { id: "quote-slide", label: "Quote Slide", href: "/design-system/templates#quote-slide" },
      { id: "blank-slide", label: "Blank Slide", href: "/design-system/templates#blank-slide" },
    ],
  },
];

function NavItemComponent({
  item,
  activePath,
  level = 0,
}: {
  item: NavItem;
  activePath: string;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(level === 0);
  const hasChildren = item.children && item.children.length > 0;
  const basePath = activePath.split("#")[0];
  const hasHash = activePath.includes("#");
  const itemBasePath = item.href?.split("#")[0] || "";
  const itemHash = item.href?.split("#")[1];
  
  // Keep parent open if we're on this page (even with hash)
  useEffect(() => {
    if (hasChildren && basePath === itemBasePath) {
      setIsOpen(true);
    }
  }, [hasChildren, basePath, itemBasePath]);
  
  // For parent items: only active if on exact page (no hash)
  // For child items: active if path matches and hash matches (if present)
  let isActive = false;
  if (hasChildren) {
    // Parent item: active only if exact path match AND no hash in activePath
    isActive = basePath === itemBasePath && !hasHash;
  } else {
    // Child item: active if path matches
    if (itemHash) {
      // Has anchor: check if path matches and hash matches
      isActive = basePath === itemBasePath && activePath.includes(`#${itemHash}`);
    } else {
      // No anchor: just check path match
      isActive = basePath === itemBasePath;
    }
  }

  return (
    <div>
      {hasChildren ? (
        <>
          <div className="flex items-center">
            <Link
              href={item.href || "#"}
              className={cn(
                "flex-1 flex items-center gap-2 px-3 py-2 rounded-md text-left transition-colors",
                "hover:bg-muted",
                level === 0 && "font-semibold",
                isActive && "bg-muted"
              )}
              style={{ paddingLeft: `${0.75 + level * 1}rem` }}
            >
              <span>{item.label}</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-2 py-2 rounded-md hover:bg-muted transition-colors"
              aria-label={isOpen ? "Collapse" : "Expand"}
            >
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
          {isOpen && (
            <div className="ml-4">
              {item.children?.map((child) => (
                <NavItemComponent
                  key={child.id}
                  item={child}
                  activePath={activePath}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.href || "#"}
          className={cn(
            "block px-3 py-2 rounded-md text-sm transition-colors",
            "hover:bg-muted",
            isActive && "bg-muted font-medium"
          )}
          style={{ paddingLeft: `${0.75 + level * 1}rem` }}
          onClick={(e) => {
            if (item.href?.includes("#")) {
              e.preventDefault();
              const [path, hash] = item.href.split("#");
              if (path === basePath && hash) {
                const element = document.querySelector(`#${hash}`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              } else {
                window.location.href = item.href;
              }
            }
          }}
        >
          {item.label}
        </Link>
      )}
    </div>
  );
}

export function DesignSystemNav() {
  const pathname = usePathname();
  
  return (
    <nav className="w-64 h-full bg-background border-r border-border p-4 overflow-y-auto">
      <div className="space-y-1">
        {navItems.map((item) => (
          <NavItemComponent
            key={item.id}
            item={item}
            activePath={pathname}
          />
        ))}
      </div>
    </nav>
  );
}
