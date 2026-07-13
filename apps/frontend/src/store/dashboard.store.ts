import { create } from "zustand";
import  { type DashboardData } from "../types/dashboard.types";

interface DashboardStore {
  dashboard: DashboardData | null;
  loading: boolean;
  error: string | null;

  setDashboard: (dashboard: DashboardData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  dashboard: null,

  loading: false,
  error: null,

  setDashboard: (dashboard) =>
    set({
      dashboard,
      error: null,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  setError: (error) =>
    set({
      error,
    }),
}));