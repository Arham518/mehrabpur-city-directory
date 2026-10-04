import { useEffect } from "react";
const BASE = "Mehrabpur City Portal";
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Mehrabpur, Naushahro Feroze, Sindh`;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", description);
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [title, description]);
}
