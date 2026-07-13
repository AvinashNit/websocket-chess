const BASE_URL = "http://localhost:4000/api/auth";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    username: string;
    email: string;
    password: string;
}

export const authService = {
    async login(payload: LoginPayload) {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        return response.json();
    },

    async signup(payload: SignupPayload) {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Signup failed");
        }

        return response.json();
    },

    async me() {
        const token = localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Unauthorized");
        }

        return response.json();
    },
};