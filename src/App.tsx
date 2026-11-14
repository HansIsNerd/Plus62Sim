import { useEffect } from 'react';
import GameBoard from './components/GameBoard';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const initGame = useGameStore((s) => s.initGame);

  useEffect(() => {
    initGame();
  }, [initGame]);

  return <GameBoard />;
}