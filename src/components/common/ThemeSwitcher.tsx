import {Switch} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useTheme} from "next-themes";

export const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();

    return (
        <Switch
            isSelected={theme === "dark"}
            onValueChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            size="lg"
            thumbIcon={({isSelected, className}) => (isSelected ? <Icon icon="mdi:weather-night" className={className} /> : <Icon icon="mdi:weather-sunny" className={className} />)}
        />
    );
};
