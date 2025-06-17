import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Button} from "@heroui/button";
import {FaWallet} from "react-icons/fa";
import {Link} from "react-router-dom";

export const LandingNavBar = () => {
    return (
        <Navbar>
            <NavbarBrand>
                <FaWallet className="text-2xl text-white mr-2" />
                <span className="text-white text-2xl font-light">智慧理財</span>
            </NavbarBrand>
            <NavbarContent justify="end" className="gap-2">
                <NavbarItem>
                    <Button as={Link} href="#" variant="light">
                        登入
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} href="#" variant="shadow">
                        註冊
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
