export type PlayerStatus = "available" | "playing";

export interface Player {
  id: string;
  username: string;
  rating: number;
  status: PlayerStatus;
}