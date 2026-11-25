import { useEffect, useState } from "react";

// true once the page has been scrolled further than `distance` pixels.
export function useScrolled(distance: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > distance);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [distance]);

  return scrolled;
}
