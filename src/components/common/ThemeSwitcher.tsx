import {Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useTheme} from "next-themes";

export const ThemeSwitcher = () => {
    const {theme, setTheme, systemTheme} = useTheme();

    const getThemeIcon = () => {
        switch (theme) {
            case "light":
                return "mdi:weather-sunny";
            case "dark":
                return "mdi:weather-night";
            case "system":
                if (systemTheme === "dark") {
                    return "mdi:weather-night";
                } else {
                    return "mdi:weather-sunny";
                }
            default:
                return "mdi:monitor";
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly variant="bordered" size="md" className="rounded-full border-1 text-default-900">
                    <Icon icon={getThemeIcon()} className="text-2xl" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="主題選擇"
                selectedKeys={[theme || "system"]}
                selectionMode="single"
                onSelectionChange={keys => {
                    if (!Array.from(keys)[0]) {
                        setTheme("system");
                        return;
                    }

                    const selectedTheme = Array.from(keys)[0] as string;
                    setTheme(selectedTheme);
                }}
            >
                <DropdownItem key="light" startContent={<Icon icon="mdi:weather-sunny" className="text-lg" />}>
                    淺色
                </DropdownItem>
                <DropdownItem key="dark" startContent={<Icon icon="mdi:weather-night" className="text-lg" />}>
                    深色
                </DropdownItem>
                <DropdownItem key="system" startContent={<Icon icon="mdi:monitor" className="text-lg" />}>
                    跟隨系統
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
