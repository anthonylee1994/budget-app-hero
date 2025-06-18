import React from "react";
import {MainNavBar} from "./MainNavBar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <React.Fragment>
            <MainNavBar />
            <div className="container mx-auto max-w-5xl space-y-6 p-4 lg:p-8">{children}</div>
        </React.Fragment>
    );
};
