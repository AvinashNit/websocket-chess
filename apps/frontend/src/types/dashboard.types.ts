// src/types/dashboard.types.ts

export interface User {
    id: string;
    username: string;
    email: string;
    avatar?: string;
    rating: number;
  }
  
  export interface DashboardStats {
    totalGames: number;
    wins: number;
    losses: number;
    draws: number;
    winRate: number;
  }
  
  export interface OnlinePlayer {
    id: string;
    username: string;
    rating: number;
    avatar?: string;
    isOnline: boolean;
  }
  
  export type GameResult = "WIN" | "LOSS" | "DRAW";
  
  export interface RecentGame {
    id: string;
    opponent: string;
    opponentRating: number;
    result: GameResult;
    playedAt: string;
  }
  
  export interface LeaderboardPlayer {
    id: string;
    rank: number;
    username: string;
    rating: number;
  }
  
  export interface DashboardData {
    user: User;
    stats: DashboardStats;
    onlinePlayers: OnlinePlayer[];
    recentGames: RecentGame[];
    leaderboard: LeaderboardPlayer[];
  }