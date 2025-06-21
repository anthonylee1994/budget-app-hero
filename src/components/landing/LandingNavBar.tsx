import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Icon} from "@iconify/react";
import {ThemeSwitcher} from "../common/ThemeSwitcher";

export const LandingNavBar = () => {
    return (
        <Navbar isBordered className="fixed pt-[env(safe-area-inset-top)]">
            <NavbarBrand>
                <Icon icon="fa-solid:wallet" className="mr-2 select-none text-2xl text-primary-500 dark:text-white" />
                <span className="select-none text-2xl font-light text-primary-500 dark:text-white">智慧理財</span>
            </NavbarBrand>
            <NavbarContent justify="end" className="gap-2">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
