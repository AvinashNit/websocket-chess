import { type DashboardStats } from "../../types/dashboard.types";
import {
    Trophy,
    Sword,
    Shield,
    Percent
} from "lucide-react";

interface Props {
    stats: DashboardStats;
}

const StatsCard = ({ stats }: Props) => {

    const cards = [
        {
            title: "Games",
            value: stats.totalGames,
            icon: Trophy
        },
        {
            title: "Wins",
            value: stats.wins,
            icon: Sword
        },
        {
            title: "Losses",
            value: stats.losses,
            icon: Shield
        },
        {
            title: "Win Rate",
            value: `${stats.winRate}%`,
            icon: Percent
        }
    ];

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 transition"
                    >

                        <div className="flex justify-between">

                            <div>

                                <p className="text-slate-400">
                                    {card.title}
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-white">
                                    {card.value}
                                </h2>

                            </div>

                            <Icon
                                className="text-blue-400"
                                size={32}
                            />

                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default StatsCard;