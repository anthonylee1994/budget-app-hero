import {useState} from "react";
import {Navbar, NavbarMenuToggle, NavbarContent, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem} from "@heroui/navbar";
import {FaChartBar, FaCog, FaList, FaSignOutAlt, FaWallet} from "react-icons/fa";
import {Link as RouterLink, useLocation} from "react-router-dom";
import {Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@heroui/react";
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
            <NavbarContent className="hidden gap-8 sm:flex" justify="center">
                {navLinks.map(link => (
                    <NavbarItem isActive={pathname === link.href} key={link.href}>
                        <Link as={RouterLink} to={link.href} size="lg" color={pathname === link.href ? "primary" : "foreground"}>
                            {link.icon && <link.icon className="mr-2" />}
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
            <NavbarMenu className="flex flex-col items-center">
                {navLinks.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} className="w-full rounded-lg px-2 py-3 transition-all hover:bg-gray-200">
                        <Link as={RouterLink} className="flex w-full items-center justify-center" size="lg" color={pathname === item.href ? "primary" : "foreground"} to={item.href}>
                            {item.icon && <item.icon className="mr-2" />}
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <Divider className="my-2" />

                <NavbarMenuItem className="flex cursor-pointer items-center py-2">
                    <Avatar src={user?.avatar_url} />
                    <span className="ml-2">{user?.name}</span>
                </NavbarMenuItem>

                <NavbarMenuItem className="w-full rounded-lg px-2 py-3 transition-all hover:bg-gray-200">
                    <Link as={RouterLink} href="#" onPress={logout} color="foreground" className="flex w-full items-center justify-center" size="lg">
                        <FaCog className="mr-2" />
                        個人設定
                    </Link>
                </NavbarMenuItem>

                <NavbarMenuItem className="w-full rounded-lg px-2 py-3 transition-all hover:bg-gray-200">
                    <Link as={RouterLink} href="#" onPress={logout} className="flex w-full items-center justify-center" size="lg" color="danger">
                        <FaSignOutAlt className="mr-2" />
                        登出
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};
