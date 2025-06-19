import React from "react";
import {Card, CardBody, Chip, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu} from "@heroui/react";
import type {Category} from "@/types/Category";
import {Icon} from "@iconify/react";
import moment from "moment";

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({category, onEdit, onDelete}) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Card isPressable className="transition-all duration-300">
                    <CardBody className="gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-4 w-4 rounded-full" style={{backgroundColor: category.color}} />
                                <div>
                                    <h3 className="text-lg font-semibold">{category.name}</h3>
                                </div>
                            </div>
                            <Chip color={category.budget_type === "income" ? "success" : "danger"} variant="flat" size="sm">
                                {category.budget_type === "income" ? "收入" : "支出"}
                            </Chip>
                        </div>
                        <div className="flex flex-col gap-2 rounded-2xl border-2 border-dashed border-gray-200 p-4 text-sm text-gray-600">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">顏色代碼</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full" style={{backgroundColor: category.color}} />
                                    <span className="font-mono text-sm">{category.color}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-medium">建立時間</span>
                                <span className="font-mono">{moment(category.created_at).format("YYYY-MM-DD")}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="edit" onPress={() => onEdit(category)}>
                    <div className="flex items-center gap-2">
                        <Icon icon="mdi:pencil" className="text-lg" />
                        編輯
                    </div>
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => onDelete(category)}>
                    <div className="flex items-center gap-2 text-red-500">
                        <Icon icon="mdi:trash-can" className="text-lg" />
                        刪除
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
