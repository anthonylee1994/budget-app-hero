import {Button} from "@heroui/button";
import {Icon} from "@iconify/react";
import {useTheme} from "next-themes";

export const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();

    return (
        <Button
            isIconOnly
            variant="bordered"
            onPress={() => {
                setTheme(theme === "dark" ? "light" : "dark");
            }}
        >
            {theme === "dark" ? (
                <Icon fontSize={20} icon="mdi:weather-sunny" className="text-blue-500 dark:text-white" />
            ) : (
                <Icon fontSize={20} icon="mdi:weather-night" className="text-blue-500 dark:text-white" />
            )}
        </Button>
    );
};
