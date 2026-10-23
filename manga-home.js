(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Content is visible without JavaScript, and under reduced-motion preferences.
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    document.querySelectorAll(".section-heading, .course-card, .interlude-heading, .path-list li, .scope-copy").forEach((panel) => {
      gsap.from(panel, {
        y: 28,
        duration: .55,
        ease: "power2.out",
        scrollTrigger: { trigger: panel, start: "top 94%", once: true },
      });
    });
    gsap.fromTo(".character-strip", { xPercent: -1 }, {
      xPercent: 1,
      ease: "none",
      scrollTrigger: { trigger: ".character-interlude", start: "top bottom", end: "bottom top", scrub: .5 },
    });
    gsap.to(".approach-orbit", {
      rotation: 30,
      ease: "none",
      scrollTrigger: { trigger: ".approach", start: "top bottom", end: "bottom top", scrub: .5 },
    });
  });
})();
