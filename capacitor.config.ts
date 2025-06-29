import {CapacitorConfig} from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "com.budget.hero",
    appName: "Budget Hero",
    webDir: "dist",
    server: {
        androidScheme: "https",
        cleartext: true,
    },
    android: {
        allowMixedContent: true,
    },
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
