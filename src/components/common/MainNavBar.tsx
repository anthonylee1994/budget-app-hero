import {useState} from "react";
import {Navbar, NavbarMenuToggle, NavbarContent, NavbarBrand, NavbarItem, NavbarMenu, NavbarMenuItem} from "@heroui/navbar";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import {Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link} from "@heroui/react";
import {useAuthStore} from "@/stores/authStore";
import {Icon} from "@iconify/react";
import {ThemeSwitcher} from "./ThemeSwitcher";

const navLinks = [
    {href: "/dashboard", label: "統計分析", icon: "mdi:chart-bar"},
    {href: "/transactions", label: "交易記錄", icon: "mdi:view-list"},
    {href: "/categories", label: "分類管理", icon: "material-symbols:category"},
];

export const MainNavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {pathname} = useLocation();
    const {user, logout} = useAuthStore();
    const navigate = useNavigate();

    return (
        <Navbar className="pt-[env(safe-area-inset-top)]" isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="full">
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="md:hidden" />
                <NavbarBrand>
                    <Icon icon="fa-solid:wallet" className="mr-2 text-2xl text-blue-500 dark:text-white" />
                    <span className="text-2xl font-light text-blue-500 dark:text-white">智慧理財</span>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden gap-8 md:flex" justify="center">
                {navLinks.map(link => (
                    <NavbarItem isActive={pathname === link.href} key={link.href}>
                        <Link as={RouterLink} to={link.href} size="lg" color={pathname === link.href ? "primary" : "foreground"}>
                            {link.icon && <Icon icon={link.icon} className="mr-2" />}
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
                        <DropdownItem key="settings" onPress={() => navigate("/settings")}>
                            個人設定
                        </DropdownItem>
                        <DropdownItem key="logout" className="text-danger" color="danger" onPress={logout}>
                            登出
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="mt-[env(safe-area-inset-top)] flex flex-col items-center">
                {navLinks.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`} className="w-full">
                        <Link
                            as={RouterLink}
                            className="flex w-full items-center justify-center rounded-lg px-2 py-3 transition-all hover:bg-gray-200 dark:hover:bg-gray-800"
                            size="lg"
                            color={pathname === item.href ? "primary" : "foreground"}
                            to={item.href}
                            onPress={() => setIsMenuOpen(false)}
                        >
                            {item.icon && <Icon icon={item.icon} className="mr-2" />}
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
                <Divider className="my-2" />

                <NavbarMenuItem className="flex cursor-pointer items-center py-2">
                    <Avatar src={user?.avatar_url} />
                    <span className="ml-2">{user?.name}</span>
                </NavbarMenuItem>

                <NavbarMenuItem className="w-full">
                    <Link
                        onPress={() => setIsMenuOpen(false)}
                        as={RouterLink}
                        to="/settings"
                        color="foreground"
                        className="flex w-full items-center justify-center rounded-lg px-2 py-3 transition-all hover:bg-gray-200 dark:hover:bg-gray-800"
                        size="lg"
                    >
                        <Icon icon="mdi:cog" className="mr-2" />
                        個人設定
                    </Link>
                </NavbarMenuItem>

                <NavbarMenuItem className="w-full">
                    <Link
                        as={RouterLink}
                        href="#"
                        onPress={logout}
                        className="flex w-full items-center justify-center rounded-lg px-2 py-3 transition-all hover:bg-gray-200 dark:hover:bg-gray-800"
                        size="lg"
                        color="danger"
                    >
                        <Icon icon="mdi:logout" className="mr-2" />
                        登出
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    );
};
