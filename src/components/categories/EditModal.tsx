import React, {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem} from "@heroui/react";
import {useCategoryStore} from "@/stores/categoryStore";
import type {Category} from "@/types/Category";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category | null;
}

interface FormData {
    name: string;
    budget_type: "income" | "expense";
    color: string;
}

const colorOptions = [
    {value: "#ef4444", label: "紅色", color: "#ef4444"},
    {value: "#f97316", label: "橙色", color: "#f97316"},
    {value: "#eab308", label: "黃色", color: "#eab308"},
    {value: "#22c55e", label: "綠色", color: "#22c55e"},
    {value: "#3b82f6", label: "藍色", color: "#3b82f6"},
    {value: "#8b5cf6", label: "紫色", color: "#8b5cf6"},
    {value: "#ec4899", label: "粉色", color: "#ec4899"},
    {value: "#64748b", label: "灰色", color: "#64748b"},
];

export const EditModal: React.FC<EditModalProps> = ({isOpen, onClose, category}) => {
    const {createCategory, updateCategory, isLoading} = useCategoryStore();

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            budget_type: "expense",
            color: "#ef4444",
        },
        mode: "onChange",
    });

    const selectedColor = watch("color");

    useEffect(() => {
        if (isOpen) {
            if (category) {
                reset({
                    name: category.name,
                    budget_type: category.budget_type,
                    color: category.color,
                });
            } else {
                reset({
                    name: "",
                    budget_type: "expense",
                    color: "#ef4444",
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
        <Modal isOpen={isOpen} onClose={handleClose} size="lg" placement="center">
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
                                        isRequired
                                    >
                                        <SelectItem key="expense">支出</SelectItem>
                                        <SelectItem key="income">收入</SelectItem>
                                    </Select>
                                )}
                            />

                            <Controller
                                name="color"
                                control={control}
                                rules={{
                                    required: "請選擇顏色",
                                }}
                                render={({field}) => (
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium">
                                            顏色 <span className="text-red-500">*</span>
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {colorOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    className={`h-12 w-full rounded-lg border-2 transition-all ${
                                                        selectedColor === option.value ? "scale-105 border-gray-400 shadow-lg" : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                                    style={{backgroundColor: option.color}}
                                                    onClick={() => field.onChange(option.value)}
                                                    title={option.label}
                                                />
                                            ))}
                                        </div>
                                        {errors.color && <p className="text-sm text-red-500">{errors.color.message}</p>}
                                    </div>
                                )}
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
