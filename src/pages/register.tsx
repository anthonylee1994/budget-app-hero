import {AvatarUploader} from "@/components/auth/AvatarUploader";
import {Header} from "@/components/auth/Header";
import {addToast, Alert, Button, Card, CardBody, Input, Link} from "@heroui/react";
import {FaEye, FaEyeSlash, FaLock, FaUser} from "react-icons/fa";
import {useForm, Controller} from "react-hook-form";
import {useAuthStore} from "@/stores/authStore";
import {useEffect, useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {useNavigate} from "react-router-dom";

export interface RegisterFormData {
    username: string;
    password: string;
    confirm_password: string;
    name: string;
    avatar_url?: string;
}

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {isAuthenticated, register} = useAuthStore();

    const checkUsernameExists = useAuthStore(state => state.checkUsernameExists);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

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
                description: "歡迎加入智慧理財！",
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
        <div className="mx-auto max-w-md p-4">
            <Header title="創建您的帳戶" description="開始您的智慧理財之旅" />
            <Card className="py-4 md:p-4">
                {serverError && <Alert color="danger" title={serverError} />}
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <CardBody className="flex flex-col items-center">
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
                            startContent={<FaUser />}
                            label="使用者名稱"
                            placeholder="請輸入使用者名稱"
                            labelPlacement="outside"
                            className="mb-4"
                            disabled={isSubmitting}
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
                            startContent={<FaUser />}
                            label="姓名"
                            placeholder="請輸入姓名"
                            labelPlacement="outside"
                            className="mb-4"
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                            disabled={isSubmitting}
                        />
                        <Input
                            {...registerField("password", {
                                required: "密碼為必填項目",
                                minLength: {
                                    value: 6,
                                    message: "密碼至少需要 6 個字元",
                                },
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
                            startContent={<FaLock />}
                            label="確認密碼"
                            type="password"
                            placeholder="請輸入確認密碼"
                            labelPlacement="outside"
                            className="mb-4"
                            isInvalid={!!errors.confirm_password}
                            errorMessage={errors.confirm_password?.message}
                            endContent={
                                <Button className="-mr-3" isIconOnly variant="light" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                </Button>
                            }
                            disabled={isSubmitting}
                        />

                        <ReCAPTCHA ref={recaptchaRef} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />

                        <Button type="submit" color="primary" size="lg" className="mt-4 w-full" isLoading={isSubmitting} isDisabled={isSubmitting || !captchaValue}>
                            註冊
                        </Button>

                        <div className="mt-4 flex items-center justify-center text-center text-sm text-gray-500">
                            已經有帳戶了嗎？{" "}
                            <Link href="/login" className="text-sm text-primary">
                                登入
                            </Link>
                        </div>
                    </CardBody>
                </form>
            </Card>
        </div>
    );
};
