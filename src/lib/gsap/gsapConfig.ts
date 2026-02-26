import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.config({
  nullTargetWarn: false,
  force3D: true,
});

gsap.defaults({
  ease: "power2.out",
  duration: 0.35,
  overwrite: "auto",
});

export { gsap, ScrollTrigger, TextPlugin };
