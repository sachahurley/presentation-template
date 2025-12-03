import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Input variants matching button heights
// Light mode: neutral-100 background, darker border, no dot pattern
// Dark mode: natural contrast, no dot pattern
// Focus ring: gradient from sky-500/600 (strong inside) to transparent (outside), 1px width
const inputVariants = cva(
  // Base styles - solid background (no bg-background to avoid dot pattern)
  // Light mode: neutral-100 background, darker border (neutral-300) for contrast
  // Dark mode: uses input/border variables for natural contrast
  // Focus ring: gradient effect using multiple box-shadows (sky-500 light, sky-600 dark)
  // Multiple shadows create gradient fade from strong inside to transparent outside
  "flex w-full rounded-md border px-3 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-100 border-neutral-300 dark:bg-input dark:border-input focus-visible:ring-0 focus-visible:shadow-[0_0_0_1px_rgb(14_165_233),0_0_2px_2px_rgb(14_165_233_/_0.3)] dark:focus-visible:shadow-[0_0_0_1px_rgb(2_132_199),0_0_2px_2px_rgb(2_132_199_/_0.3)]",
  {
    variants: {
      size: {
        default: "h-9", // Matches button default height (36px)
        sm: "h-8", // Matches button sm height (32px)
        lg: "h-10", // Matches button lg height (40px)
      },
      variant: {
        default: "",
        error: "border-destructive focus-visible:shadow-[0_0_0_1px_rgb(239_68_68),0_0_2px_2px_rgb(239_68_68_/_0.3)] dark:focus-visible:shadow-[0_0_0_1px_rgb(220_38_38),0_0_2px_2px_rgb(220_38_38_/_0.3)]",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }

