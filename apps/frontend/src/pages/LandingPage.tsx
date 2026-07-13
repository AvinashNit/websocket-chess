import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Trophy,
  Users,
  Swords,
  Crown,
} from "lucide-react";
import { LandingNavbar } from "@/components/navbar/LandingPageNav"; 

export  function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      
    <LandingNavbar></LandingNavbar>
      <main className="bg-slate-950 text-white pt-16">
        {/* Hero */}
        <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 rounded-full bg-emerald-500/20 px-5 py-2 text-sm text-emerald-400">
            ♟ Real-Time Multiplayer Chess
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
            Play Chess
            <span className="text-emerald-400"> Anytime, </span>
            Challenge
            <span className="text-yellow-400"> Anyone.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-400">
            Play against real players, improve your rating, and climb the
            leaderboard in a fast and beautiful multiplayer chess experience.
          </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
                onClick={() => navigate("/home")}
                className="rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
            >
                Play as Guest
            </button>

            <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold transition hover:bg-emerald-600"
            >
                Get Started
                <ArrowRight size={18} />
            </button>

            <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-slate-700 px-6 py-3 transition hover:bg-slate-800"
            >
                Login
            </button>
            </div>

          <div className="mt-16 text-8xl select-none">♔</div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-6 py-20"
        >
          <h2 className="mb-12 text-center text-4xl font-bold">
            Why Choose Our Platform?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <Users className="mb-5 text-emerald-400" size={36} />

              <h3 className="mb-3 text-2xl font-semibold">
                Multiplayer
              </h3>

              <p className="text-slate-400">
                Challenge players online and enjoy real-time gameplay with
                smooth matchmaking.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <Trophy className="mb-5 text-yellow-400" size={36} />

              <h3 className="mb-3 text-2xl font-semibold">
                Leaderboard
              </h3>

              <p className="text-slate-400">
                Win games, increase your rating, and compete with the best
                players.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <Swords className="mb-5 text-red-400" size={36} />

              <h3 className="mb-3 text-2xl font-semibold">
                Live Matches
              </h3>

              <p className="text-slate-400">
                Play exciting live games with instant move synchronization.
              </p>
            </div>
          </div>
        </section>
        <section
            id="how-it-works"
            className="mx-auto max-w-6xl px-6 py-24"
            >
            <h2 className="mb-12 text-center text-4xl font-bold">
                How It Works
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">
                <div className="mb-4 text-5xl">1️⃣</div>

                <h3 className="mb-3 text-xl font-semibold">
                    Create an Account
                </h3>

                <p className="text-slate-400">
                    Register for free and personalize your profile.
                </p>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">
                <div className="mb-4 text-5xl">2️⃣</div>

                <h3 className="mb-3 text-xl font-semibold">
                    Find an Opponent
                </h3>

                <p className="text-slate-400">
                    Join the lobby and challenge players online.
                </p>
                </div>

                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 text-center">
                <div className="mb-4 text-5xl">3️⃣</div>

                <h3 className="mb-3 text-xl font-semibold">
                    Play & Improve
                </h3>

                <p className="text-slate-400">
                    Win games, increase your rating, and climb the leaderboard.
                </p>
                </div>
            </div>
            </section>
                <section
                    id="leaderboard"
                    className="bg-slate-900 py-24"
                    >
                    <div className="mx-auto max-w-4xl px-6">
                        <h2 className="mb-12 text-center text-4xl font-bold">
                        Top Players
                        </h2>

                        <div className="overflow-hidden rounded-2xl border border-slate-800">
                        {[
                            ["🥇", "KnightKing", 2410],
                            ["🥈", "QueenSlayer", 2385],
                            ["🥉", "BishopMaster", 2340],
                        ].map(([rank, name, rating]) => (
                            <div
                            key={name as string}
                            className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-5 last:border-none"
                            >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{rank}</span>

                                <span className="font-semibold">
                                {name}
                                </span>
                            </div>

                            <span className="text-emerald-400">
                                {rating}
                            </span>
                            </div>
                        ))}
                        </div>
                    </div>
                    </section>
        {/* CTA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl rounded-3xl bg-slate-900 p-12 text-center border border-slate-800">
            <Crown
              className="mx-auto mb-6 text-yellow-400"
              size={50}
            />

            <h2 className="text-4xl font-bold">
              Ready to Make Your First Move?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Create your free account today and start playing against
              players around the world.
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="mt-8 rounded-xl bg-emerald-500 px-8 py-4 font-semibold transition hover:bg-emerald-600"
            >
              Create Free Account
            </button>
          </div>
        </section>
        <section
                id="about"
                className="mx-auto max-w-5xl px-6 py-24 text-center"
                >
                <h2 className="mb-8 text-4xl font-bold">
                    About Chess
                </h2>

                <p className="text-lg leading-8 text-slate-400">
                    Chess is a modern multiplayer platform built for players who
                    enjoy fast, competitive, and beautiful online chess. Whether
                    you're playing casually with friends or climbing the leaderboard,
                    our goal is to deliver a smooth and engaging experience.
                </p>
                </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
          © 2026 Chess • Built with React, TypeScript & Tailwind CSS
        </footer>
      </main>
    </>
  );
}