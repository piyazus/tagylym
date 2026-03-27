"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-medium transition-all duration-200 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-sm hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110",
        secondary: "border border-border bg-transparent text-foreground hover:border-accent/30 hover:shadow-sm hover:bg-muted",
        ghost: "text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "h-12 px-8 py-3.5",
        sm: "h-10 px-4 text-sm rounded-lg",
        lg: "h-14 px-10 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If we wanted to support asChild we would import Slot from @radix-ui/react-slot
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
