import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Icon} from "@iconify/react";
import {ThemeSwitcher} from "../common/ThemeSwitcher";

export const LandingNavBar = () => {
    return (
        <Navbar isBordered className="fixed pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)]">
            <NavbarBrand>
                <Icon icon="fa-solid:wallet" className="mr-2 select-none text-2xl text-primary-500 dark:text-white" />
                <span className="select-none bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-gray-300">BudgetHero</span>
            </NavbarBrand>
            <NavbarContent justify="end" className="gap-2">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
