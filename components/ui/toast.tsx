"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Trash2, CheckCircle, Info, CircleAlert, LucideIcon } from "lucide-react";

// Toast variant types - determines which icon to show
export type ToastVariant = "default" | "delete" | "success" | "info" | "warning";

// Toast context for managing toasts
interface Toast {
  id: string;
  message: string;
  duration?: number;
  variant?: ToastVariant; // Optional variant for contextual icons
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, duration?: number, variant?: ToastVariant) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

// Toast Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const addToast = React.useCallback((message: string, duration = 4000, variant: ToastVariant = "default") => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, duration, variant };
    
    setToasts((prev) => [...prev, newToast]);

    // Don't auto-remove here - let ToastItem handle its own removal after exit animation
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Toast Container - renders all toasts
interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// Helper function to get icon component based on variant
function getToastIcon(variant: ToastVariant = "default"): LucideIcon {
  switch (variant) {
    case "delete":
      return Trash2; // Trash icon
    case "success":
      return CheckCircle; // Check circle icon
    case "info":
      return Info; // Info icon
    case "warning":
      return CircleAlert; // Alert circle icon
    default:
      // Default variant doesn't show an icon
      return Info; // Fallback, but won't be rendered for default
  }
}

// Individual Toast Item Component
interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  // Get the icon component for this toast variant
  const IconComponent = toast.variant && toast.variant !== "default" 
    ? getToastIcon(toast.variant) 
    : null;
  // Animation states: 'entering' -> 'visible' -> 'exiting'
  const [animationState, setAnimationState] = React.useState<'entering' | 'visible' | 'exiting'>('entering');
  const exitTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const removeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Slide in animation - trigger immediately after mount
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimationState('visible');
      });
    });

    // Start exit animation after duration
    exitTimeoutRef.current = setTimeout(() => {
      setAnimationState('exiting');
      // Remove from DOM after exit animation completes
      removeTimeoutRef.current = setTimeout(() => {
        onRemove();
      }, 300); // Match animation duration (300ms)
    }, toast.duration || 4000);

    return () => {
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current);
      }
      if (removeTimeoutRef.current) {
        clearTimeout(removeTimeoutRef.current);
      }
    };
  }, [toast.duration, onRemove]);

  // Calculate transform and opacity values based on animation state
  // Using inline styles to ensure transform is always applied
  const getTransformStyle = () => {
    switch (animationState) {
      case 'entering':
        return { transform: 'translateY(32px)', opacity: 0 }; // Start off-screen below (32px = translate-y-8)
      case 'visible':
        return { transform: 'translateY(0)', opacity: 1 }; // On-screen position
      case 'exiting':
        return { transform: 'translateY(32px)', opacity: 0 }; // Slide back down off-screen
      default:
        return { transform: 'translateY(32px)', opacity: 0 };
    }
  };

  return (
    <div
      className={cn(
        // Base styles - simpler card variant with less padding
        "bg-card text-card-foreground rounded-lg border border-border shadow-lg",
        "px-4 py-3 w-[320px]",
        "pointer-events-auto",
        // Flex layout to accommodate icon on the left - center icon with first line of text
        "flex items-center gap-3",
        // Animation: slide up from bottom, pause, slide back down
        // Use ease-out for both directions to match the animation
        "transition-all duration-300 ease-out"
      )}
      style={{
        // Elevation 5 - stronger shadow for depth
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        // Apply transform and opacity via inline styles to ensure they're always applied
        ...getTransformStyle(),
      }}
    >
      {/* Icon on the left side - only render if variant is not default */}
      {IconComponent && (
        <IconComponent 
          className={cn(
            "h-5 w-5 flex-shrink-0", // Icon size - centered vertically with first line of text
            // Variant-specific colors
            toast.variant === "delete" && "text-destructive",
            toast.variant === "success" && "text-green-600 dark:text-green-400",
            toast.variant === "info" && "text-blue-600 dark:text-blue-400",
            toast.variant === "warning" && "text-yellow-600 dark:text-yellow-400"
          )} 
        />
      )}
      {/* Message text */}
      <p className="text-sm font-medium flex-1">{toast.message}</p>
    </div>
  );
}

