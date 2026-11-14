import { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const status = useGameStore((s) => s.status);
  const initGame = useGameStore((s) => s.initGame);

  useEffect(() => {
    if (status === 'idle') initGame();
  }, [status, initGame]);

  return (
    <div className="min-h-screen">
      <GameBoard />
    </div>
  );
}