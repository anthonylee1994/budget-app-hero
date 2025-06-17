import axios from "axios";
import {useAuthStore} from "@/stores/authStore.ts";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string;

axios.interceptors.request.use(request => {
    const token = useAuthStore.getState().token;
    if (token && request.headers) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

axios.interceptors.response.use(response => {
    if (response.config.headers && typeof response.config.headers.Authorization === "string") {
        const authorization = response.config.headers.Authorization.split(" ")[1];
        useAuthStore.getState().setToken(authorization);
    }
    return response;
});

export const apiClient = axios;
