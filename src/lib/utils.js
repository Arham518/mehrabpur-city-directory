import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs) => twMerge(clsx(inputs));
export const fmt = (n) => new Intl.NumberFormat("en-US").format(n);
