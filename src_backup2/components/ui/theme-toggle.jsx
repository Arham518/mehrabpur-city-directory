import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

/** Animated sun/moon switch (21st.dev "theme toggler" style). */
export function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative flex h-10 w-[68px] shrink-0 cursor-pointer items-center rounded-full border border-line bg-card px-1 shadow-inner transition-colors hover:border-accent",
        className
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn("flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white shadow-md", dark ? "ml-auto" : "ml-0")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={dark ? "m" : "s"} initial={{ rotate: -90, scale: 0.4, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} exit={{ rotate: 90, scale: 0.4, opacity: 0 }} transition={{ duration: 0.18 }}>
            {dark ? <Moon size={16} /> : <Sun size={16} />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
      <span className={cn("pointer-events-none absolute text-muted", dark ? "left-3" : "right-3")}>
        {dark ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  );
}
