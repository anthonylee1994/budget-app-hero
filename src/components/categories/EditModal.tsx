import React, {useState, useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem} from "@heroui/react";
import {useCategoryStore} from "@/stores/categoryStore";
import type {Category} from "@/types/Category";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: Category | null;
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
    const [formData, setFormData] = useState({
        name: "",
        budget_type: "expense" as "income" | "expense",
        color: "#ef4444",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name,
                budget_type: category.budget_type,
                color: category.color,
            });
        } else {
            setFormData({
                name: "",
                budget_type: "expense",
                color: "#ef4444",
            });
        }
        setErrors({});
    }, [category, isOpen]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = "分類名稱不能為空";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "分類名稱至少需要2個字符";
        }

        if (!formData.budget_type) {
            newErrors.budget_type = "請選擇分類類型";
        }

        if (!formData.color) {
            newErrors.color = "請選擇顏色";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            if (category) {
                await updateCategory(category.id, formData);
            } else {
                await createCategory(formData);
            }
            onClose();
        } catch (error) {
            console.error("提交失敗:", error);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: ""}));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" placement="center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{category ? "編輯分類" : "新增分類"}</ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-4">
                        <Input
                            label="分類名稱"
                            placeholder="請輸入分類名稱"
                            value={formData.name}
                            onChange={e => handleInputChange("name", e.target.value)}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name}
                            isRequired
                        />

                        <Select
                            label="分類類型"
                            placeholder="請選擇分類類型"
                            selectedKeys={[formData.budget_type]}
                            onSelectionChange={keys => {
                                const selectedKey = Array.from(keys)[0] as string;
                                handleInputChange("budget_type", selectedKey);
                            }}
                            isInvalid={!!errors.budget_type}
                            errorMessage={errors.budget_type}
                            isRequired
                        >
                            <SelectItem key="expense">支出</SelectItem>
                            <SelectItem key="income">收入</SelectItem>
                        </Select>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">顏色</label>
                            <div className="grid grid-cols-4 gap-2">
                                {colorOptions.map(option => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        className={`h-12 w-full rounded-lg border-2 transition-all ${
                                            formData.color === option.value ? "scale-105 border-gray-400" : "border-gray-200 hover:border-gray-300"
                                        }`}
                                        style={{backgroundColor: option.color}}
                                        onClick={() => handleInputChange("color", option.value)}
                                        title={option.label}
                                    />
                                ))}
                            </div>
                            {errors.color && <p className="text-sm text-red-500">{errors.color}</p>}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        取消
                    </Button>
                    <Button color="primary" onPress={handleSubmit} isLoading={isLoading}>
                        {category ? "更新" : "新增"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
