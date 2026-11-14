import EraSelect from './components/EraSelect';
import GameBoard from './components/GameBoard';
import { GameOverOverlay } from './components/GameOverOverlay';
import { useGameStore } from './store/useGameStore';

export default function App() {
  const selectedEra = useGameStore((s) => s.selectedEra);

  return (
    <>
      {selectedEra === null ? <EraSelect /> : <GameBoard />}
      <GameOverOverlay />
    </>
  );
}