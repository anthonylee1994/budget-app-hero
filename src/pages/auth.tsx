import {Header} from "@/components/auth/Header";
import {LoginForm} from "@/components/auth/LoginForm";
import {RegisterForm} from "@/components/auth/RegisterForm";
import {Card, Tabs, Tab, CardBody} from "@heroui/react";
import {useAuthStore} from "@/stores/authStore";
import {useEffect, useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {ThemeSwitcher} from "@/components/common/ThemeSwitcher";

export const AuthPage = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {isAuthenticated} = useAuthStore();

    // Tab state
    const [selectedTab, setSelectedTab] = useState<string>("login");

    // Set initial tab based on route
    useEffect(() => {
        if (pathname === "/register") {
            setSelectedTab("register");
        } else {
            setSelectedTab("login");
        }
    }, [pathname]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleTabChange = (key: React.Key) => {
        if (key === "register") {
            navigate("/register");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="mx-auto mt-[env(safe-area-inset-top)] max-w-md p-4 pb-[calc(env(safe-area-inset-bottom)+2rem)]">
            <Header title={selectedTab === "login" ? "歡迎回來" : "創建您的帳戶"} description={selectedTab === "login" ? "登入您的智慧理財帳戶" : "開始您的智慧理財之旅"} />

            <Card className="p-4 py-4">
                <CardBody className="p-0">
                    <Tabs fullWidth selectedKey={selectedTab} onSelectionChange={handleTabChange} classNames={{tabList: "w-full"}}>
                        <Tab key="login" title="登入">
                            <LoginForm onSwitchToRegister={() => handleTabChange("register")} />
                        </Tab>

                        <Tab key="register" title="註冊">
                            <RegisterForm onSwitchToLogin={() => handleTabChange("login")} />
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>

            <div className="fixed right-4 top-4">
                <ThemeSwitcher />
            </div>
        </div>
    );
};
