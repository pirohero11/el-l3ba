import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: [
        "primary",
        "background-light",
        "background-dark",
        "sunny-yellow",
        "sky-blue",
        "candy-pink",
        "bright-purple",
        "mint-green",
        "admin-slate",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
