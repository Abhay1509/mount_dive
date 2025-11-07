import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top after route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // Fallback: also reset scrollTop for any scrollable containers
    document.querySelectorAll("*").forEach((el) => {
      if (el.scrollTop) el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}
