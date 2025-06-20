import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Button} from "@heroui/button";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import {ThemeSwitcher} from "../common/ThemeSwitcher";

export const LandingNavBar = () => {
    return (
        <Navbar isBordered className="fixed pt-[env(safe-area-inset-top)]">
            <NavbarBrand>
                <Icon icon="fa-solid:wallet" className="mr-2 text-2xl text-blue-500 dark:text-white" />
                <span className="text-2xl font-light text-blue-500 dark:text-white">智慧理財</span>
            </NavbarBrand>
            <NavbarContent justify="end" className="gap-2">
                <NavbarItem>
                    <Button as={Link} to="/login" variant="light">
                        登入
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} to="/register" variant="shadow">
                        註冊
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
