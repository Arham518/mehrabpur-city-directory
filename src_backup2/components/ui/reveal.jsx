import { motion } from "framer-motion";

/** Scroll-reveal wrapper (fade + rise). */
export function Reveal({ children, delay = 0, y = 18, className, as = "div", ...props }) {
  const M = motion[as] || motion.div;
  return (
    <M initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }} className={className} {...props}>
      {children}
    </M>
  );
}
