import { Swords } from "lucide-react";

export interface PlayerCardProps {
  id: string;
  username: string;
  rating: number;
  status: "available" | "playing";
  onChallenge?: (id: string) => void;
}

export default function PlayerCard({
  id,
  username,
  rating,
  status,
  onChallenge,
}: PlayerCardProps) {
  const available = status === "available";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900 p-6 transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10">

      {/* Left */}

      <div className="flex items-center gap-5">

        {/* Avatar */}

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 text-xl font-bold text-white">
          {username.charAt(0).toUpperCase()}
        </div>

        {/* Player Info */}

        <div>
          <h2 className="text-lg font-semibold text-white">
            {username}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Rating • {rating}
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {available ? (
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
            ● Available
          </span>
        ) : (
          <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-400">
            ● Playing
          </span>
        )}

        <button
          disabled={!available}
          onClick={() => onChallenge?.(id)}
          className={`flex items-center gap-2 rounded-xl px-5 py-2 font-medium transition-all duration-300 ${
            available
              ? "bg-emerald-500 hover:bg-emerald-600 active:scale-95 cursor-pointerclea"
              : "cursor-not-allowed bg-slate-700 text-slate-400"
          }`}
        >
          <Swords size={18} />

          {available ? "Challenge" : "In Game"}
        </button>
      </div>
    </div>
  );
}