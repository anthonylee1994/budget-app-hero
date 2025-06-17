import {Banner} from "@/components/landing/Banner";
import {Footer} from "@/components/landing/Footer";
import {LandingNavBar} from "@/components/landing/LandingNavBar";
import {Ready} from "@/components/landing/Ready";
import {Statistics} from "@/components/landing/Statistics";
import {WhyUS} from "@/components/landing/WhyUS";
import React from "react";

export const IndexPage = () => {
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
