import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search, Users } from "lucide-react";

import PlayerCard from "../player/PlayerCard";
import { usePlayerStore } from "../../store/player.store";

export  function Players() {
  const [search, setSearch] = useState("");

  const {
    players,
    loading,
    error,
    fetchPlayers,
    challengePlayer,
  } = usePlayerStore();

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const filteredPlayers = useMemo(() => {
    return players.filter((player) =>
      player.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [players, search]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-10 max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl p-8">

        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold">
              <Users className="text-emerald-500" />
              Online Players
            </h1>

            <p className="mt-2 text-slate-400">
              Challenge players who are currently online.
            </p>
          </div>

          <button
            onClick={fetchPlayers}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 transition hover:bg-slate-800"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>

        {/* Search */}

        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search online players..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-4 outline-none transition focus:border-emerald-500"
          />
        </div>

        {/* Player List */}

        {filteredPlayers.length === 0 ? (
          <div className="rounded-xl border border-slate-700 bg-slate-900 py-16 text-center text-slate-400">
            No online players found.
          </div>
        ) : (
          <div className="space-y-5">
            {filteredPlayers.map((player) => (
              <PlayerCard
                key={player.id}
                {...player}
                onChallenge={challengePlayer}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}