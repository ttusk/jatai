type Gsap = (typeof import("gsap"))["default"];

export function createTerminalTimeline(gsap: Gsap, scope: ParentNode) {
  const characters = scope.querySelectorAll<HTMLElement>("[data-terminal-char]");
  const output = scope.querySelectorAll<HTMLElement>("[data-terminal-output]");
  const mel = scope.querySelector<HTMLElement>("[data-terminal-mel]");
  const timeline = gsap.timeline({ paused: true });

  gsap.set(characters, { autoAlpha: 0 });
  gsap.set(output, { autoAlpha: 0, y: 8 });
  if (mel) gsap.set(mel, { autoAlpha: 0, y: 8 });

  if (characters.length > 0) {
    timeline.to(
      characters,
      { autoAlpha: 1, duration: 0.01, stagger: { amount: 0.52 }, ease: "none" },
      0,
    );
  }

  if (output.length > 0) {
    timeline.to(
      output,
      { autoAlpha: 1, y: 0, duration: 0.12, stagger: { amount: 0.14 }, ease: "power1.out" },
      0.62,
    );
  }

  if (mel) {
    timeline.to(mel, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power1.out" }, 0.84);
  }

  return timeline;
}
