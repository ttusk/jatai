import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const FONT_VARIANTS = [
  "font-pixel-circle",
  "font-pixel-grid",
  "font-pixel-triangle",
  "font-pixel-line",
  "font-pixel-square",
] as const;

export function AnimatedTitle() {
  const shouldReduceMotion = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [variantIndex, setVariantIndex] = useState(FONT_VARIANTS.length - 1);

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const replay = useCallback(() => {
    stop();

    if (shouldReduceMotion) {
      setVariantIndex(FONT_VARIANTS.length - 1);
      return;
    }

    setVariantIndex(0);
    FONT_VARIANTS.slice(1).forEach((_, index) => {
      timers.current.push(setTimeout(() => setVariantIndex(index + 1), (index + 1) * 150));
    });
  }, [shouldReduceMotion, stop]);

  useEffect(() => {
    replay();
    return stop;
  }, [replay, stop]);

  return (
    <motion.h1
      tabIndex={0}
      onMouseEnter={replay}
      onFocus={replay}
      className={`${FONT_VARIANTS[variantIndex]} w-fit text-[clamp(4.5rem,12vw,9rem)] leading-[0.78] tracking-[-0.08em] text-ink outline-none focus-visible:ring-2 focus-visible:ring-honey-dark focus-visible:ring-offset-8`}
      animate={shouldReduceMotion ? undefined : { opacity: [0.78, 1], y: [2, 0] }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      Jataí
    </motion.h1>
  );
}
