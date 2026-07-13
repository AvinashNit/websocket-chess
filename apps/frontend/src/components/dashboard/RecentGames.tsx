import { type RecentGame } from "../../types/dashboard.types";

interface Props {
    games: RecentGame[];
}

const RecentGames = ({ games }: Props) => {

    const color = (result: string) => {

        if (result === "WIN")
            return "text-green-400";

        if (result === "LOSS")
            return "text-red-400";

        return "text-yellow-400";

    };

    return (

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-semibold text-white">
                Recent Games
            </h2>

            <div className="space-y-4">

                {games.length === 0 && (

                    <p className="text-slate-400">
                        No games played.
                    </p>

                )}

                {games.map((game) => (

                    <div
                        key={game.id}
                        className="rounded-xl bg-slate-800 p-4"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="text-white font-semibold">
                                    vs {game.opponent}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Rating {game.opponentRating}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className={`font-bold ${color(game.result)}`}>
                                    {game.result}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {game.playedAt}
                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

};

export default RecentGames;