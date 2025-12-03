import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Textarea variants matching input styling
// Light mode: neutral-100 background, darker border, no dot pattern
// Dark mode: natural contrast, no dot pattern
// Focus ring: gradient from sky-500/600 (strong inside) to transparent (outside), 1px width
const textareaVariants = cva(
  // Base styles - solid background (no bg-background to avoid dot pattern)
  // Light mode: neutral-100 background, darker border (neutral-300) for contrast
  // Dark mode: uses input/border variables for natural contrast
  // Focus ring: gradient effect using multiple box-shadows (sky-500 light, sky-600 dark)
  // Multiple shadows create gradient fade from strong inside to transparent outside
  "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm transition-all placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-100 border-neutral-300 dark:bg-input dark:border-input focus-visible:ring-0 focus-visible:shadow-[0_0_0_1px_rgb(14_165_233),0_0_2px_2px_rgb(14_165_233_/_0.3)] dark:focus-visible:shadow-[0_0_0_1px_rgb(2_132_199),0_0_2px_2px_rgb(2_132_199_/_0.3)] resize-y",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus-visible:shadow-[0_0_0_1px_rgb(239_68_68),0_0_2px_2px_rgb(239_68_68_/_0.3)] dark:focus-visible:shadow-[0_0_0_1px_rgb(220_38_38),0_0_2px_2px_rgb(220_38_38_/_0.3)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TextareaProps
  extends React.ComponentProps<"textarea">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }

