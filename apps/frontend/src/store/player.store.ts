import { create } from "zustand";
import { playerService } from "@/services/player.service";
import type { Player } from "@/types/player.types";

interface PlayerStore {
  players: Player[];
  loading: boolean;
  error: string | null;

  fetchPlayers: () => Promise<void>;

  challengePlayer: (id: string) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  players: [],

  loading: false,

  error: null,

  fetchPlayers: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const players = await playerService.getOnlinePlayers();

      set({
        players,
        loading: false,
      });
    } catch {
      set({
        loading: false,
        error: "Unable to load players.",
      });
    }
  },

  challengePlayer: (id) => {
    console.log("Challenge sent to", id);
  },
}));