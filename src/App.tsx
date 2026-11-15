import GameBoard from './components/GameBoard';
import TraitSelect from './components/TraitSelect';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const status = useGameStore((s) => s.status);

  return (
    <div className="min-h-screen">
      {status === 'idle' ? <TraitSelect /> : <GameBoard />}
    </div>
  );
}