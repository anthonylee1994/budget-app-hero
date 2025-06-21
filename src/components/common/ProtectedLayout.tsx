import {Outlet} from "react-router-dom";
import {ProtectedRoute} from "../auth/ProtectedRoute";
import {MainNavBar} from "./MainNavBar";

export const ProtectedLayout = () => {
    return (
        <ProtectedRoute>
            <MainNavBar />
            <div className="container mx-auto max-w-6xl space-y-6 p-4 !pt-[calc(80px+env(safe-area-inset-top))] pb-[calc(env(safe-area-inset-bottom)+1rem)] lg:p-8 lg:!pt-[calc(90px+env(safe-area-inset-top))]">
                <Outlet />
            </div>
        </ProtectedRoute>
    );
};
