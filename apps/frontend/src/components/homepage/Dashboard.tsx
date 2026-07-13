
import { useEffect } from "react";
import   { backendCall }  from "@/lib/axios";
import { useDashboardStore } from "@/store/dashboard.store";

import WelcomeCard from "@/components/dashboard/WelcomeCard";
import StatsCard from "@/components/dashboard/StatsCard";
import OnlinePlayers from "@/components/dashboard/OnlinePlayers";
import RecentGames from "@/components/dashboard/RecentGames";

const Dashboard = () => {
  const {
    dashboard,
    loading,
    error,
    setDashboard,
    setLoading,
    setError,
  } = useDashboardStore();

  useEffect(() => {
    setDashboard({
        "user": {
          "id": "1",
          "username": "Avinash",
          "email": "avinash@gmail.com",
          "rating": 1234
        },
        "stats": {
          "totalGames": 56,
          "wins": 32,
          "losses": 20,
          "draws": 4,
          "winRate": 57
        },
        "onlinePlayers": [
          {
            "id": "2",
            "username": "Rahul",
            "rating": 1450,
            "isOnline": true
          },
          {
            "id": "3",
            "username": "Aman",
            "rating": 1210,
            "isOnline": true
          }
        ],
        "recentGames": [
          {
            "id": "1",
            "opponent": "Rahul",
            "opponentRating": 1450,
            "result": "WIN",
            "playedAt": "2026-07-12"
          },
          {
            "id": "2",
            "opponent": "Aman",
            "opponentRating": 1210,
            "result": "LOSS",
            "playedAt": "2026-07-11"
          }
        ],
        leaderboard:[]
    })
    setLoading( false )
    setError( null )
    // const fetchDashboard = async () => {
    //   try {
    //     setLoading(true);

    //     const res = await api.get("/dashboard");

    //     setDashboard(res.data);
    //   } catch (err: any) {
    //     setError(err.response?.data?.message || "Something went wrong");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchDashboard();
  }, []);

  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <main className="min-h-screen bg-slate-950 px-8 py-8">
      <div className="mx-auto max-w-7xl space-y-8">

        <WelcomeCard user={dashboard.user} />

        <StatsCard stats={dashboard.stats} />

        <div className="grid gap-8 lg:grid-cols-2">
          <OnlinePlayers players={dashboard.onlinePlayers} />

          <RecentGames games={dashboard.recentGames} />
        </div>

      </div>
    </main>
  );
};

export { Dashboard } ;