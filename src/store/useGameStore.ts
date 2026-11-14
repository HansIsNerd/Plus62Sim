import { create } from 'zustand';
import type { EraId } from '../types/era';

interface GameState {
  selectedEra: EraId | null;
  onSelect: (eraId: EraId) => void;
}

export const useGameStore = create<GameState>((set) => ({
  selectedEra: null,
  onSelect: (eraId) => set({ selectedEra: eraId }),
}));