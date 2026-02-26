export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isTouchOrReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    prefersReducedMotion()
  );
}
