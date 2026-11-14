import { useEffect } from 'react';
import { useGameStore, DAY_MS } from '../store/useGameStore';

export function useGameLoop(): void {
  useEffect(() => {
    const id = window.setInterval(() => {
      const { isPaused, isGameOver, resolveTick } = useGameStore.getState();
      if (isPaused || isGameOver) return;
      resolveTick();
    }, DAY_MS);

    return () => window.clearInterval(id);
  }, []);
}

export default useGameLoop;