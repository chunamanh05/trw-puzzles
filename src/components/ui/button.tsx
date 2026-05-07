"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer select-none focus:outline-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
          // Variants
          variant === "default" &&
            "bg-white text-black hover:bg-white/90 shadow-md",
          variant === "outline" &&
            "border border-white/20 text-white hover:bg-white/10",
          variant === "ghost" &&
            "text-white/70 hover:text-white hover:bg-white/10",
          // Sizes
          size === "sm" && "px-4 py-1.5 text-xs",
          size === "md" && "px-6 py-2.5 text-sm",
          size === "lg" && "px-8 py-3 text-base",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
