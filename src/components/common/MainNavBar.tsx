import {Navbar, NavbarMenuToggle, NavbarContent, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem} from "@heroui/navbar";
import {FaChartBar, FaCog, FaList, FaWallet} from "react-icons/fa";
import {useState} from "react";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@heroui/react";
import {useAuthStore} from "@/stores/authStore";

const navLinks = [
    {href: "/dashboard", label: "統計分析", icon: FaChartBar},
    {href: "/transactions", label: "交易記錄", icon: FaList},
    {href: "/categories", label: "分類管理", icon: FaCog},
];

export const MainNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {pathname} = useLocation();
    const {user, logout} = useAuthStore();

    return (
        <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
                <NavbarBrand>
                    <FaWallet className="mr-2 text-2xl text-blue-500" />
                    <span className="text-2xl font-light text-blue-500">智慧理財</span>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                {navLinks.map(link => (
                    <NavbarItem isActive={pathname === link.href} key={link.href}>
                        <Link as={RouterLink} to={link.href} color={pathname === link.href ? "primary" : "foreground"}>
                            {link.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <Dropdown>
                    <DropdownTrigger>
                        <NavbarItem className="hidden cursor-pointer items-center sm:flex">
                            <Avatar src={user?.avatar_url} />
                            <span className="ml-2">{user?.name}</span>
                        </NavbarItem>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="settings">個人設定</DropdownItem>
                        <DropdownItem key="logout" className="text-danger" color="danger" onPress={logout}>
                            登出
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
            <NavbarMenu>
                {navLinks.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link as={RouterLink} className="w-full" color={pathname === item.href ? "primary" : "foreground"} to={item.href}>
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};
