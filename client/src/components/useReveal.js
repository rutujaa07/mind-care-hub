import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to elements with class `.reveal`
 * and adds `.visible` when they enter the viewport.
 * Call once in a page-level component.
 */
export default function useReveal(dep = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dep);
}
