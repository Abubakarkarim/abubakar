import { gsap, ScrollTrigger } from "./gsapConfig";
import { prefersReducedMotion } from "./prefersReducedMotion";

const REDUCED = () => prefersReducedMotion();
const DEFAULT_DURATION = 0.8;
const DEFAULT_STAGGER = 0.08;

function setWillChange(el: gsap.TweenTarget, value: string) {
  const els = Array.isArray(el) ? el : [el];
  if (typeof els[0] === "object" && els[0] !== null && "style" in (els[0] as Element)) {
    els.forEach((e) => {
      (e as HTMLElement).style.willChange = value;
    });
  }
}

export function clearWillChange(el: gsap.TweenTarget) {
  const els = Array.isArray(el) ? el : [el];
  els.forEach((e) => {
    if (typeof e === "object" && e !== null && "style" in (e as Element)) {
      ((e as HTMLElement).style as unknown as { willChange: string }).willChange = "auto";
    }
  });
}

export function animateFadeUp(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween | null {
  if (REDUCED()) return null;
  setWillChange(element, "transform, opacity");
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40, force3D: true },
    {
      opacity: 1,
      y: 0,
      force3D: true,
      duration: vars?.duration ?? DEFAULT_DURATION,
      ease: vars?.ease ?? "power3.out",
      onComplete: () => clearWillChange(element),
      ...vars,
    }
  );
}

export function animateFadeLeft(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween | null {
  if (REDUCED()) return null;
  setWillChange(element, "transform, opacity");
  return gsap.fromTo(
    element,
    { opacity: 0, x: -60, force3D: true },
    {
      opacity: 1,
      x: 0,
      force3D: true,
      duration: vars?.duration ?? DEFAULT_DURATION,
      ease: vars?.ease ?? "power3.out",
      onComplete: () => clearWillChange(element),
      ...vars,
    }
  );
}

export function animateFadeRight(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween | null {
  if (REDUCED()) return null;
  setWillChange(element, "transform, opacity");
  return gsap.fromTo(
    element,
    { opacity: 0, x: 60, force3D: true },
    {
      opacity: 1,
      x: 0,
      force3D: true,
      duration: vars?.duration ?? DEFAULT_DURATION,
      ease: vars?.ease ?? "power3.out",
      onComplete: () => clearWillChange(element),
      ...vars,
    }
  );
}

export function animateScale(
  element: gsap.TweenTarget,
  vars?: gsap.TweenVars
): gsap.core.Tween | null {
  if (REDUCED()) return null;
  setWillChange(element, "transform, opacity");
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.9, force3D: true },
    {
      opacity: 1,
      scale: 1,
      force3D: true,
      duration: vars?.duration ?? DEFAULT_DURATION,
      ease: vars?.ease ?? "power3.out",
      onComplete: () => clearWillChange(element),
      ...vars,
    }
  );
}

export function animateStagger(
  elements: gsap.TweenTarget,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  staggerAmount?: number
): gsap.core.Tween | null {
  if (REDUCED()) return null;
  setWillChange(elements, "transform, opacity");
  return gsap.fromTo(
    elements,
    { force3D: true, ...fromVars },
    {
      force3D: true,
      stagger: staggerAmount ?? DEFAULT_STAGGER,
      onComplete: () => clearWillChange(elements),
      ...toVars,
    }
  );
}

/** Wrap text in spans per character and animate y from 100% to 0 for reveal */
export function animateTextReveal(
  element: HTMLElement,
  vars?: gsap.TweenVars
): gsap.core.Tween | null {
  if (REDUCED()) return null;
  const text = element.textContent ?? "";
  element.textContent = "";
  const chars = text.split("");
  const spans = chars.map((char) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.overflow = "hidden";
    span.style.verticalAlign = "bottom";
    span.innerHTML = char === " " ? "&nbsp;" : char;
    element.appendChild(span);
    return span;
  });
  setWillChange(spans, "transform");
  return gsap.fromTo(
    spans,
    { y: "100%", force3D: true },
    {
      y: 0,
      force3D: true,
      duration: vars?.duration ?? 0.5,
      stagger: 0.02,
      ease: vars?.ease ?? "power3.out",
      onComplete: () => clearWillChange(spans),
      ...vars,
    }
  );
}

export { setWillChange };
