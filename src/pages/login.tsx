import {Header} from "@/components/auth/Header";
import {useAuthStore} from "@/stores/authStore";
import {addToast, Alert, Button, Card, CardBody, Input} from "@heroui/react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {FaEyeSlash, FaEye, FaLock, FaUser} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";

interface LoginFormData {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const {isAuthenticated} = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const {
        register: registerField,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);
        setServerError(null);

        try {
            await login(data.username, data.password);

            addToast({
                title: "登入成功！",
                description: "歡迎回到智慧理財！",
                color: "success",
            });

            navigate("/dashboard");
        } catch (error: any) {
            console.error("Login error:", error);

            if (error.response?.status === 401) {
                setServerError("使用者名稱或密碼錯誤");
                reset();
            } else if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                if (Array.isArray(errors)) {
                    setServerError(errors.join(", "));
                } else {
                    setServerError(error.response.data.error || "登入失敗，請檢查輸入資料");
                }
            } else if (error.code === "NETWORK_ERROR" || !error.response) {
                setServerError("網路連線錯誤，請檢查網路連線");
            } else {
                setServerError("登入失敗，請稍後再試");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto mt-[env(safe-area-inset-top)] max-w-md p-4 pb-[env(safe-area-inset-bottom)]">
            <Header title="歡迎回來" description="登入您的智慧理財帳戶" />
            <Card className="p-4 py-4">
                {serverError && <Alert color="danger" title={serverError} className="m" />}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <CardBody className="flex flex-col items-center">
                        <Input
                            {...registerField("username", {
                                required: "使用者名稱為必填項目",
                            })}
                            validationBehavior="aria"
                            isInvalid={!!errors.username}
                            errorMessage={errors.username?.message}
                            startContent={<FaUser />}
                            label="使用者名稱"
                            placeholder="請輸入使用者名稱"
                            labelPlacement="outside"
                            className="mb-4"
                            disabled={isSubmitting}
                        />
                        <Input
                            {...registerField("password", {
                                required: "密碼為必填項目",
                            })}
                            startContent={<FaLock />}
                            label="密碼"
                            type={showPassword ? "text" : "password"}
                            placeholder="請輸入密碼"
                            labelPlacement="outside"
                            className="mb-4"
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            endContent={
                                <Button className="-mr-3" isIconOnly variant="light" onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </Button>
                            }
                            disabled={isSubmitting}
                        />
                        <Button type="submit" color="primary" size="lg" className="mt-4 w-full" isLoading={isSubmitting}>
                            登入
                        </Button>
                        <div className="mt-4 flex items-center justify-center text-center text-sm text-gray-500">
                            還沒有帳戶嗎？{" "}
                            <Link to="/register" className="text-sm text-primary">
                                註冊
                            </Link>
                        </div>
                    </CardBody>
                </form>
            </Card>
        </div>
    );
};
