import { type OnlinePlayer } from "../../types/dashboard.types";

interface Props {
    players: OnlinePlayer[];
}

const OnlinePlayers = ({ players }: Props) => {

    return (

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-semibold text-white">
                Online Players
            </h2>

            <div className="space-y-4">

                {players.length === 0 && (

                    <p className="text-slate-400">
                        No players online.
                    </p>

                )}

                {players.map((player) => (

                    <div
                        key={player.id}
                        className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
                    >

                        <div className="flex items-center gap-4">

                            <div className="h-3 w-3 rounded-full bg-green-500" />

                            <div>

                                <h3 className="font-semibold text-white">
                                    {player.username}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Rating {player.rating}
                                </p>

                            </div>

                        </div>

                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
                        >
                            Challenge
                        </button>

                    </div>

                ))}

            </div>

        </section>

    );

};

export default OnlinePlayers;