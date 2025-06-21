import {Banner} from "@/components/landing/Banner";
import {Footer} from "@/components/landing/Footer";
import {LandingNavBar} from "@/components/landing/LandingNavBar";
import {Ready} from "@/components/landing/Ready";
import {Statistics} from "@/components/landing/Statistics";
import {WhyUS} from "@/components/landing/WhyUS";
import {useAuthStore} from "@/stores/authStore";
import React from "react";
import {Navigate} from "react-router-dom";

export const IndexPage = () => {
    const {isAuthenticated} = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <React.Fragment>
            <LandingNavBar />
            <Banner />
            <Statistics />
            <WhyUS />
            <Ready />
            <Footer />
        </React.Fragment>
    );
};
