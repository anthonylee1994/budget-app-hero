import {LoginForm} from "@/components/auth/LoginForm";
import {RegisterForm} from "@/components/auth/RegisterForm";
import {Card, Tabs, Tab, CardBody} from "@heroui/react";
import {useNavigate, useLocation} from "react-router-dom";

export const AuthPage = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleTabChange = (key: React.Key) => {
        if (key === "register") {
            navigate("/register");
        } else {
            navigate("/login");
        }
    };

    return (
        <Card className="p-4 py-4">
            <CardBody className="p-0">
                <Tabs fullWidth selectedKey={pathname === "/register" ? "register" : "login"} onSelectionChange={handleTabChange} classNames={{tabList: "w-full"}}>
                    <Tab key="login" title="登入">
                        <LoginForm onSwitchToRegister={() => handleTabChange("register")} />
                    </Tab>

                    <Tab key="register" title="註冊">
                        <RegisterForm onSwitchToLogin={() => handleTabChange("login")} />
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    );
};
