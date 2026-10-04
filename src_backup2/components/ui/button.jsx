import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white shadow-[0_8px_20px_-8px_var(--accent)] hover:brightness-110 hover:-translate-y-0.5",
        soft: "bg-bg-soft text-ink border border-line hover:bg-accent-soft hover:border-accent/40",
        outline: "border border-line bg-card text-ink hover:border-accent hover:text-accent",
        ghost: "text-muted hover:text-accent hover:bg-accent-soft",
      },
      size: { sm: "h-8 px-3", md: "h-10 px-4", lg: "h-12 px-6 text-base", icon: "h-10 w-10" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export function Button({ className, variant, size, as: As = "button", ...props }) {
  return <As className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
