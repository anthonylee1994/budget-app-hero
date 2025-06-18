import {create} from "zustand";
import {persist} from "zustand/middleware";
import {apiClient} from "../utils/apiClient";
import type {User} from "../types/User";
interface UpdateProfileData {
    name?: string;
    avatar_url: string | null;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password: string, name: string, captcha: string, avatar_url?: string) => Promise<void>;
    checkUsernameExists: (username: string) => Promise<boolean>;
    setToken: (token: string) => void;
    fetchProfile: () => Promise<User>;
    updateProfile: (data: UpdateProfileData) => Promise<User>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setToken: (token: string) => {
                set({token});
            },
            login: async (username: string, password: string) => {
                try {
                    const response = await apiClient.post("/login", {username, password});
                    const user: User = response.data;
                    set({token: user.token, user, isAuthenticated: true});
                } catch (error) {
                    throw error;
                }
            },

            logout: () => {
                // Clear auth state
                set({token: null, user: null, isAuthenticated: false});
            },

            register: async (username: string, password: string, name: string, captcha: string, avatar_url?: string) => {
                try {
                    const requestBody: any = {username, password, name, recaptcha_value: captcha};

                    if (avatar_url) {
                        requestBody.avatar_url = avatar_url;
                    }

                    const response = await apiClient.post("/register", requestBody);
                    const user: User = response.data;
                    set({token: user.token, user, isAuthenticated: true});
                } catch (error) {
                    throw error;
                }
            },

            checkUsernameExists: async (username: string) => {
                try {
                    const response = await apiClient.get(`/username_exists?username=${username}`);
                    return response.data.exists;
                } catch (error) {
                    throw error;
                }
            },

            fetchProfile: async () => {
                try {
                    const response = await apiClient.get("/profile");
                    const user: User = response.data;
                    set({user});
                    return user;
                } catch (error) {
                    throw error;
                }
            },

            updateProfile: async (data: UpdateProfileData) => {
                try {
                    const response = await apiClient.put("/profile", data);
                    const profileData = response.data as User;

                    // Update the user in the store with the new profile data
                    set(state => ({
                        user: state.user
                            ? {
                                  ...state.user,
                                  name: profileData.name,
                                  avatar_url: profileData.avatar_url,
                                  updated_at: profileData.updated_at,
                              }
                            : null,
                    }));

                    return profileData;
                } catch (error) {
                    throw error;
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: state => ({token: state.token, user: state.user, isAuthenticated: state.isAuthenticated}),
        }
    )
);
