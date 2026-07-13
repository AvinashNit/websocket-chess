import { Crown, Medal, Trophy } from "lucide-react";

interface LeaderboardCardProps {
  rank: number;
  username: string;
  rating: number;
  games: number;
  wins: number;
}

export default function LeaderboardCard({
  rank,
  username,
  rating,
  games,
  wins,
}: LeaderboardCardProps) {
  const winRate = ((wins / games) * 100).toFixed(1);

  const topThree = {
    1: {
      border: "border-yellow-500/40",
      bg: "bg-yellow-500/5",
      text: "text-yellow-400",
      icon: <Crown size={22} />,
      label: "Champion",
    },
    2: {
      border: "border-slate-500/40",
      bg: "bg-slate-500/5",
      text: "text-slate-300",
      icon: <Trophy size={20} />,
      label: "Runner Up",
    },
    3: {
      border: "border-orange-500/40",
      bg: "bg-orange-500/5",
      text: "text-orange-400",
      icon: <Medal size={20} />,
      label: "Top Player",
    },
  } as const;

  const style =
    rank <= 3
      ? topThree[rank as keyof typeof topThree]
      : {
          border: "border-slate-800",
          bg: "",
          text: "text-emerald-400",
          icon: null,
          label: "Ranked Player",
        };

  return (
    <div
      className={`group rounded-2xl border ${style.border} ${style.bg}
      bg-slate-900 p-6 transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl`}
    >
      {/* Top */}

      <div className="mb-6 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${style.text}`}>
          {style.icon}
          <span className="text-sm font-medium">
            {style.label}
          </span>
        </div>

        <div className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold">
          #{rank}
        </div>
      </div>

      {/* Avatar */}

      <div className="mb-6 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-3xl font-bold text-emerald-400">
          {username[0]!.toUpperCase()}
        </div>
      </div>

      {/* Username */}

      <div className="text-center">
        <h3 className="truncate text-xl font-semibold">
          {username}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Global Rank #{rank}
        </p>
      </div>

      {/* Stats */}

      <div className="my-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-800 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Rating
          </p>

          <p className="mt-2 text-xl font-bold text-emerald-400">
            {rating}
          </p>
        </div>

        <div className="rounded-xl bg-slate-800 p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Win Rate
          </p>

          <p className="mt-2 text-xl font-bold">
            {winRate}%
          </p>
        </div>

      </div>

      <div className="flex justify-between border-t border-slate-800 pt-4 text-sm">
        <div>
          <p className="text-slate-500">Games</p>
          <p className="font-semibold">{games}</p>
        </div>

        <div className="text-right">
          <p className="text-slate-500">Wins</p>
          <p className="font-semibold">{wins}</p>
        </div>
      </div>
    </div>
  );
}