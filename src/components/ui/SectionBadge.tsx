"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface SectionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animated?: boolean;
}

export function SectionBadge({ children, animated = true, className, ...props }: SectionBadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-5 py-2",
        className
      )} 
      {...props}
    >
      <motion.span 
        className="h-2 w-2 rounded-full bg-accent"
        animate={animated ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : undefined}
        transition={animated ? { duration: 2, repeat: Infinity } : undefined}
      />
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent font-semibold">
        {children}
      </span>
    </div>
  )
}
