"use client";

import { useRef, useCallback } from "react";

type Options = {
  /** Max rotation in degrees */
  max?: number;
  /** Scale on hover */
  scale?: number;
};

/**
 * 3D tilt on hover. Attach `ref` to the card and spread `handlers`
 * on the same element. Uses a CSS transform driven by pointer position,
 * written directly to the node (no re-render per mousemove).
 */
export function useCardTilt<T extends HTMLElement = HTMLDivElement>({
  max = 10,
  scale = 1.02,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      const rotateY = (px - 0.5) * (max * 2);
      const rotateX = -(py - 0.5) * (max * 2);

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
      });
    },
    [max, scale]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return {
    ref,
    handlers: { onMouseMove, onMouseLeave },
  };
}
