import {Header} from "@/components/auth/Header";
import {ThemeSwitcher} from "@/components/common/ThemeSwitcher";
import {useAuthStore} from "@/stores/authStore";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export const AuthLayout = () => {
    const {pathname} = useLocation();
    const {isAuthenticated} = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="mx-auto max-w-md p-4 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[env(safe-area-inset-top)]">
            <Header title={pathname === "/register" ? "創建您的帳戶" : "歡迎回來"} description={pathname === "/register" ? "開始您的理財之旅" : "登入您的理財帳戶"} />
            <Outlet />
            <div className="fixed right-4 top-[calc(env(safe-area-inset-top)+1rem)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
                <ThemeSwitcher />
            </div>
        </div>
    );
};
