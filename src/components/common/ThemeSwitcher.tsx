import {Button} from "@heroui/button";
import {Icon} from "@iconify/react";
import {useTheme} from "next-themes";

export const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();

    return (
        <Button
            isIconOnly
            variant="light"
            className="transition-all duration-300"
            onPress={() => {
                setTheme(theme === "dark" ? "light" : "dark");
            }}
        >
            {theme === "dark" ? (
                <Icon fontSize={24} icon="mdi:weather-sunny" className="text-primary-500 dark:text-white" />
            ) : (
                <Icon fontSize={24} icon="mdi:weather-night" className="text-primary-500 dark:text-white" />
            )}
        </Button>
    );
};
