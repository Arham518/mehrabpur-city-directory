import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-5", {
  variants: {
    variant: {
      default: "bg-accent-soft text-accent",
      muted: "bg-bg-soft text-muted border border-line",
      success: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400",
      warn: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    },
  },
  defaultVariants: { variant: "default" },
});

export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
