import { useMemo, useState } from "react";
import { RefreshCw, Search, Trophy } from "lucide-react";

import LeaderboardCard from "../leaderboard/LeaderboardCard";

const leaderboard = [
  {
    id: "1",
    username: "Avinash",
    rating: 2895,
    games: 420,
    wins: 366,
  },
  {
    id: "2",
    username: "Avinash",
    rating: 2854,
    games: 398,
    wins: 329,
  },
  {
    id: "3",
    username: "Avinash",
    rating: 2821,
    games: 381,
    wins: 298,
  },
  {
    id: "4",
    username: "Aviansh",
    rating: 2795,
    games: 340,
    wins: 268,
  },
  {
    id: "5",
    username: "Praggnanandhaa",
    rating: 2787,
    games: 332,
    wins: 259,
  },
  {
    id: "6",
    username: "Avinash",
    rating: 2778,
    games: 318,
    wins: 242,
  },
];

export default function Leaderboard() {
  const [search, setSearch] = useState("");

  const filteredPlayers = useMemo(() => {
    return leaderboard.filter((player) =>
      player.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl space-y-8 p-8">

        {/* Hero */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
                <Trophy
                  size={30}
                  className="text-yellow-400"
                />
              </div>

              <h1 className="text-4xl font-bold">
                Leaderboard
              </h1>

              <p className="mt-3 max-w-xl text-slate-400">
                The highest rated players on the platform.
              </p>

            </div>

            <button
              className="flex items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 transition hover:border-yellow-500 hover:bg-slate-700"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Ranked Players
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              {leaderboard.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Showing
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {filteredPlayers.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Season
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              2026
            </h2>
          </div>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leaderboard..."
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-16 pr-5 outline-none transition focus:border-yellow-500"
          />

        </div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {filteredPlayers.map((player, index) => (
            <LeaderboardCard
              key={player.id}
              rank={index + 1}
              {...player}
            />
          ))}

        </div>

      </div>
    </div>
  );
}