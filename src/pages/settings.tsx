import React, {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {Card, CardBody, CardHeader, Button, Input, addToast} from "@heroui/react";
import {AvatarUploader} from "@/components/auth/AvatarUploader";
import {useAuthStore} from "@/stores/authStore";

interface FormData {
    name: string;
    avatar_url?: string;
}

export const SettingsPage = () => {
    const {user, fetchProfile, updateProfile} = useAuthStore();
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: {errors, isDirty},
    } = useForm<FormData>({
        defaultValues: {
            name: user?.name || "",
            avatar_url: user?.avatar_url || "",
        },
        mode: "onChange",
    });

    const watchedAvatarUrl = watch("avatar_url");

    useEffect(() => {
        reset({
            name: user?.name || "",
            avatar_url: user?.avatar_url || "",
        });
    }, [user, reset]);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                await fetchProfile();
            } catch (error) {
                console.error("Failed to load profile:", error);
                addToast({
                    title: "載入失敗",
                    description: "無法載入個人資料",
                    color: "danger",
                });
            }
        };

        loadProfile();
    }, [fetchProfile]);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            await updateProfile({
                name: data.name.trim(),
                avatar_url: data.avatar_url || null,
            });

            addToast({
                title: "更新成功",
                description: "個人資料已成功更新",
                color: "success",
            });
        } catch (error: any) {
            console.error("Update profile error:", error);
            addToast({
                title: "更新失敗",
                description: error.response?.data?.message || "無法更新個人資料，請稍後重試",
                color: "danger",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarChange = (url: string | undefined) => {
        setValue("avatar_url", url || "", {shouldDirty: true});
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-default-500">載入中...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-md space-y-6">
            <h2 className="my-2 text-2xl font-bold lg:my-0 lg:text-3xl">個人設定</h2>
            <Card className="p-3">
                <CardHeader className="pb-4">
                    <h3 className="text-lg font-semibold">個人資料</h3>
                </CardHeader>
                <CardBody className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <AvatarUploader value={watchedAvatarUrl} onChange={handleAvatarChange} />
                        </div>
                        <div className="space-y-4">
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "顯示名稱不能為空",
                                    minLength: {
                                        value: 2,
                                        message: "顯示名稱至少需要2個字符",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "顯示名稱不能超過50個字符",
                                    },
                                    validate: value => {
                                        if (!value.trim()) {
                                            return "顯示名稱不能為空";
                                        }
                                        return true;
                                    },
                                }}
                                render={({field}) => (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-default-700">姓名</label>
                                        <Input {...field} placeholder="請輸入您的姓名" isInvalid={!!errors.name} errorMessage={errors.name?.message} />
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button color="primary" type="submit" isLoading={isLoading} isDisabled={!isDirty} className="flex-1">
                                儲存變更
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};
