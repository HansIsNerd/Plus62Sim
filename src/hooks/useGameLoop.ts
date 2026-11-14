import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';

export const TICK_MS = 3000; // 1 hari = 3 detik (pada speed 1x)

/**
 * Loop berbasis requestAnimationFrame.
 * Mengembalikan ref untuk elemen progress bar (diupdate langsung ke DOM
 * agar tidak memicu re-render tiap frame).
 */
export function useGameLoop() {
  const isPaused = useGameStore((s) => s.isPaused);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const eraId = useGameStore((s) => s.eraId);

  const progressRef = useRef<HTMLDivElement>(null);
  const accRef = useRef(0);

  useEffect(() => {
    if (!eraId) {
      accRef.current = 0;
      if (progressRef.current) progressRef.current.style.width = '0%';
    }
  }, [eraId]);

  useEffect(() => {
    if (isPaused || isGameOver || !eraId) return;

    let rafId = 0;
    let last = performance.now();

    const frame = (now: number) => {
      // Batasi delta agar tab yang di-background tidak melompat banyak hari
      const delta = Math.min(now - last, 100);
      last = now;

      const { speed, resolveTick } = useGameStore.getState();
      accRef.current += delta * speed;

      if (accRef.current >= TICK_MS) {
        accRef.current -= TICK_MS;
        resolveTick();
        if (useGameStore.getState().isGameOver) {
          accRef.current = 0;
        }
      }

      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(
          100,
          (accRef.current / TICK_MS) * 100,
        )}%`;
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, isGameOver, eraId]);

  return { progressRef };
}