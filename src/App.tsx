import EraSelect from './components/EraSelect';
import GameBoard from './components/GameBoard';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const eraId = useGameStore((s) => s.eraId);
  return eraId ? <GameBoard /> : <EraSelect />;
}