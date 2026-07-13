

import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";

export function useAuth() {

    const { user, setUser , clearUser } = useAuthStore(); 
    

    const login = async (
        email: string,
        password: string
    ) => {
        const data = await authService.login({
            email,
            password,
        });

        localStorage.setItem("token", data.token);

        setUser(data.user);
    };

    const signup = async (
        username: string,
        email: string,
        password: string
    ) => {
        const data = await authService.signup({
            username,
            email,
            password,
        });

        localStorage.setItem("token", data.token);

        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        clearUser();
    };

    const restoreSession = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const data = await authService.me();
            setUser(data.user);
        } catch {
            logout();
        }
    };

 

    return {
        user,
        login,
        signup,
        logout,
    };
}