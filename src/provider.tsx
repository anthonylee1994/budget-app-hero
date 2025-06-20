import type {NavigateOptions} from "react-router-dom";
import {HeroUIProvider} from "@heroui/system";
import {useHref, useNavigate} from "react-router-dom";
import {ToastProvider} from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";

declare module "@react-types/shared" {
    interface RouterConfig {
        routerOptions: NavigateOptions;
    }
}

export function Provider({children}: {children: React.ReactNode}) {
    const navigate = useNavigate();

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref}>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <ToastProvider placement="bottom-center" toastOffset={20} toastProps={{timeout: 3000, shouldShowTimeoutProgress: true}} />
                <main className="h-[100dvh] bg-background text-foreground">{children}</main>
            </NextThemesProvider>
        </HeroUIProvider>
    );
}
