import {AvatarUploader} from "@/components/auth/AvatarUploader";
import {Icon} from "@iconify/react";
import {addToast, Alert, Button, Input, Link} from "@heroui/react";
import {useForm, Controller} from "react-hook-form";
import {useAuthStore} from "@/stores/authStore";
import {useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {useNavigate} from "react-router-dom";
import React from "react";
import {useTheme} from "next-themes";

export interface RegisterFormData {
    username: string;
    password: string;
    confirm_password: string;
    name: string;
    avatar_url?: string;
}

interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({onSwitchToLogin}) => {
    const navigate = useNavigate();
    const {register} = useAuthStore();
    const {theme} = useTheme();
    const checkUsernameExists = useAuthStore(state => state.checkUsernameExists);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const {
        register: registerField,
        handleSubmit,
        formState: {errors},
        control,
        watch,
    } = useForm<RegisterFormData>();

    const watchPassword = watch("password");

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaValue(value);
    };

    const validateUsername = async (username: string) => {
        if (!username || username.length < 3) return true; // Let required validation handle this

        try {
            const exists = await checkUsernameExists(username);
            if (exists) {
                return "此使用者名稱已被使用";
            }
            return true;
        } catch (error) {
            return true; // Don't fail validation on network error
        }
    };

    const onSubmit = async (data: RegisterFormData) => {
        // Validate captcha before submitting
        if (!captchaValue) {
            return;
        }

        setIsSubmitting(true);
        setServerError(null);

        try {
            await register(data.username, data.password, data.name, captchaValue, data.avatar_url);

            addToast({
                title: "註冊成功！",
                description: "歡迎加入 BudgetHero！",
                color: "success",
            });

            navigate("/dashboard");
        } catch (error: any) {
            console.error("Registration error:", error);

            // Reset reCAPTCHA on error
            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
                setCaptchaValue(null);
            }

            if (error.response?.status === 422) {
                const errors = error.response.data.errors;
                if (Array.isArray(errors)) {
                    setServerError(errors.join(", "));
                } else {
                    setServerError(error.response.data.error || "註冊失敗，請檢查輸入資料");
                }
            } else {
                setServerError("註冊失敗，請稍後再試");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            {serverError && <Alert color="danger" title={serverError} className="mb-4" />}
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
                <Controller name="avatar_url" control={control} render={({field}) => <AvatarUploader value={field.value} onChange={field.onChange} />} />
                <Input
                    {...registerField("username", {
                        required: "使用者名稱為必填項目",
                        minLength: {
                            value: 3,
                            message: "使用者名稱至少需要 3 個字元",
                        },
                        maxLength: {
                            value: 50,
                            message: "使用者名稱不能超過 50 個字元",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._]+$/,
                            message: "使用者名稱只能包含字母、數字、點號和底線",
                        },
                        validate: validateUsername,
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
                    autoComplete="username"
                />
                <Input
                    {...registerField("name", {
                        required: "姓名為必填項目",
                        minLength: {
                            value: 2,
                            message: "姓名至少需要 2 個字元",
                        },
                        maxLength: {
                            value: 50,
                            message: "姓名不能超過 50 個字元",
                        },
                    })}
                    startContent={<Icon icon="mdi:user" />}
                    label="姓名"
                    placeholder="請輸入姓名"
                    labelPlacement="outside"
                    className="mb-4"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                    disabled={isSubmitting}
                    autoComplete="given-name"
                />
                <Input
                    {...registerField("password", {
                        required: "密碼為必填項目",
                        minLength: {
                            value: 6,
                            message: "密碼至少需要 6 個字元",
                        },
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
                    autoComplete="new-password"
                />
                <Input
                    {...registerField("confirm_password", {
                        required: "請確認您的密碼",
                        validate: value => {
                            if (value !== watchPassword) {
                                return "密碼不一致，請重新輸入";
                            }
                            return true;
                        },
                    })}
                    startContent={<Icon icon="mdi:lock" />}
                    label="確認密碼"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="請輸入確認密碼"
                    labelPlacement="outside"
                    className="mb-4"
                    isInvalid={!!errors.confirm_password}
                    errorMessage={errors.confirm_password?.message}
                    endContent={
                        <Button className="-mr-3" isIconOnly variant="light" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <Icon icon="mdi:eye" /> : <Icon icon="mdi:eye-off" />}
                        </Button>
                    }
                    disabled={isSubmitting}
                    autoComplete="new-password"
                />

                <ReCAPTCHA theme={theme === "dark" ? "dark" : "light"} ref={recaptchaRef} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />

                <Button type="submit" color="primary" size="lg" className="mt-4 w-full" isLoading={isSubmitting} isDisabled={isSubmitting || !captchaValue}>
                    註冊
                </Button>

                <div className="mt-4 flex items-center justify-center text-center text-sm text-default-500">
                    已經有帳戶了嗎？{" "}
                    <Link className="h-auto min-w-0 cursor-pointer p-0 text-sm text-primary" onPress={onSwitchToLogin}>
                        登入
                    </Link>
                </div>
            </form>
        </React.Fragment>
    );
};
