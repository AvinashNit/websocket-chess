import { create } from "zustand";

export interface User {
    id: string;
    username: string;
    email: string;
}

interface AuthStore {
    user: User | null;

    setUser: (user: User) => void;

    clearUser: () => void;

   
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,

    setUser: ( user ) => set({ user }),

    clearUser: () => set({ user: null }),

    
}));