import type { Player } from "@/types/player.types";

const mockPlayers: Player[] = [
  {
    id: "1",
    username: "Magnus",
    rating: 2847,
    status: "available",
  },
  {
    id: "2",
    username: "Hikaru",
    rating: 2812,
    status: "playing",
  },
  {
    id: "3",
    username: "Fabiano",
    rating: 2791,
    status: "available",
  },
  {
    id: "4",
    username: "Alireza",
    rating: 2765,
    status: "available",
  },
  {
    id: "5",
    username: "Ian",
    rating: 2758,
    status: "playing",
  },
];

export const playerService = {
  async getOnlinePlayers(): Promise<Player[]> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    return mockPlayers;
  },
};