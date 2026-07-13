import { type User } from "../../types/dashboard.types";
import { Crown } from "lucide-react";

interface Props {
  user: User;
}

const WelcomeCard = ({ user }: Props) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400 text-sm">
            Welcome Back 👋
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            {user.username}
          </h1>

          <p className="mt-3 text-slate-400">
            Ready for another match?
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-amber-500/10 px-6 py-4">

          <Crown
            size={28}
            className="text-yellow-400"
          />

          <div>
            <p className="text-xs text-slate-400">
              Rating
            </p>

            <h2 className="text-2xl font-bold text-white">
              {user.rating}
            </h2>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WelcomeCard;