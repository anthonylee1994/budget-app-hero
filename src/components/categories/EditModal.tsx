import React, {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem} from "@heroui/react";
import {useCategoryStore} from "@/stores/categoryStore";
import type {Category} from "@/types/Category";
import {ColorPicker} from "./ColorPicker";
import {IconPicker} from "./IconPicker";
import {useIsDesktop} from "../hooks/useIsDesktop";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category | null;
}

interface FormData {
    name: string;
    budget_type: "income" | "expense";
    color: string;
    icon: string;
}

export const EditModal: React.FC<EditModalProps> = ({isOpen, onClose, category}) => {
    const {createCategory, updateCategory, isLoading} = useCategoryStore();
    const isDesktop = useIsDesktop();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            budget_type: "expense",
            color: "#ef4444",
            icon: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (isOpen) {
            if (category) {
                reset({
                    name: category.name,
                    budget_type: category.budget_type,
                    color: category.color,
                    icon: category.icon || "",
                });
            } else {
                reset({
                    name: "",
                    budget_type: "expense",
                    color: "#F56565",
                    icon: "",
                });
            }
        }
    }, [category, isOpen, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            if (category) {
                await updateCategory(category.id, data);
            } else {
                await createCategory(data);
            }
            onClose();
        } catch (error) {
            console.error("提交失敗:", error);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose} size="lg" placement={isDesktop ? "center" : "top"} className="!mt-[calc(80px+env(safe-area-inset-top))]">
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader className="flex flex-col gap-1">{category ? "編輯分類" : "新增分類"}</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "分類名稱不能為空",
                                    minLength: {
                                        value: 2,
                                        message: "分類名稱至少需要2個字符",
                                    },
                                    validate: value => {
                                        if (!value.trim()) {
                                            return "分類名稱不能為空";
                                        }
                                        return true;
                                    },
                                }}
                                render={({field}) => <Input {...field} label="分類名稱" placeholder="請輸入分類名稱" isInvalid={!!errors.name} errorMessage={errors.name?.message} />}
                            />

                            <Controller
                                name="budget_type"
                                control={control}
                                rules={{
                                    required: "請選擇分類類型",
                                }}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        label="分類類型"
                                        placeholder="請選擇分類類型"
                                        selectedKeys={field.value ? [field.value] : []}
                                        onSelectionChange={keys => {
                                            const selectedKey = Array.from(keys)[0] as "income" | "expense";
                                            field.onChange(selectedKey);
                                        }}
                                        isInvalid={!!errors.budget_type}
                                        errorMessage={errors.budget_type?.message}
                                    >
                                        <SelectItem key="expense">支出</SelectItem>
                                        <SelectItem key="income">收入</SelectItem>
                                    </Select>
                                )}
                            />

                            <Controller name="icon" control={control} render={({field}) => <IconPicker value={field.value} onChange={field.onChange} />} />

                            <Controller
                                name="color"
                                control={control}
                                rules={{
                                    required: "請選擇顏色",
                                }}
                                render={({field}) => <ColorPicker {...field} />}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={handleClose}>
                            取消
                        </Button>
                        <Button color="primary" type="submit" isLoading={isLoading}>
                            {category ? "更新" : "新增"}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
