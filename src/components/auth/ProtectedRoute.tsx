import React from "react";
import {Navigate} from "react-router-dom";
import {useAuthStore} from "@/stores/authStore";

interface Props {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({children}) => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <React.Fragment>{children}</React.Fragment>;
};
