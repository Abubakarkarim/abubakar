import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.config({
  nullTargetWarn: false,
});

gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

export { gsap, ScrollTrigger, TextPlugin };
