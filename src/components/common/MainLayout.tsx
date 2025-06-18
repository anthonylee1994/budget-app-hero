import React from "react";
import {MainNavBar} from "./MainNavBar";
import {useLocation} from "react-router-dom";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    const {pathname} = useLocation();

    if (pathname === "/login" || pathname === "/register" || pathname === "/") {
        return <React.Fragment>{children}</React.Fragment>;
    }

    return (
        <React.Fragment>
            <MainNavBar />
            <div className="container mx-auto max-w-6xl space-y-6 p-4 lg:p-8">{children}</div>
        </React.Fragment>
    );
};
