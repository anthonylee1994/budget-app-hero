import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Button} from "@heroui/button";
import {FaWallet} from "react-icons/fa";
import {Link} from "react-router-dom";

export const LandingNavBar = () => {
    return (
        <Navbar isBordered className="mt-[env(safe-area-inset-top)]">
            <NavbarBrand>
                <FaWallet className="mr-2 text-2xl text-blue-500" />
                <span className="text-2xl font-light text-blue-500">智慧理財</span>
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
            </NavbarContent>
        </Navbar>
    );
};
