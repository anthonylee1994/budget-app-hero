import {Icon} from "@iconify/react";
import {addToast, Alert, Button, CardBody, Input, Link} from "@heroui/react";
import {useForm} from "react-hook-form";
import {useAuthStore} from "@/stores/authStore";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import React from "react";

interface LoginFormData {
    username: string;
    password: string;
}

interface LoginFormProps {
    onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({onSwitchToRegister}) => {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

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
        <React.Fragment>
            {serverError && <Alert color="danger" title={serverError} className="mb-4" />}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <CardBody className="flex flex-col items-center px-1">
                    <Input
                        {...registerField("username", {
                            required: "使用者名稱為必填項目",
                        })}
                        validationBehavior="aria"
                        isInvalid={!!errors.username}
                        errorMessage={errors.username?.message}
                        startContent={<Icon icon="mdi:user" />}
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
                        startContent={<Icon icon="mdi:lock" />}
                        label="密碼"
                        type={showPassword ? "text" : "password"}
                        placeholder="請輸入密碼"
                        labelPlacement="outside"
                        className="mb-4"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                        endContent={
                            <Button className="-mr-3" isIconOnly variant="light" onPress={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
                            </Button>
                        }
                        disabled={isSubmitting}
                    />
                    <Button type="submit" color="primary" size="lg" className="mt-4 w-full" isLoading={isSubmitting}>
                        登入
                    </Button>
                    <div className="mt-4 flex items-center justify-center text-center text-sm text-gray-500">
                        還沒有帳戶嗎？{" "}
                        <Link className="h-auto min-w-0 cursor-pointer p-0 text-sm text-primary" onPress={onSwitchToRegister}>
                            註冊
                        </Link>
                    </div>
                </CardBody>
            </form>
        </React.Fragment>
    );
};
