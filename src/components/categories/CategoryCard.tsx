import React from "react";
import {Card, CardBody, Chip, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu} from "@heroui/react";
import type {Category} from "@/types/Category";
import {Icon} from "@iconify/react";
import {Haptics, ImpactStyle} from "@capacitor/haptics";

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({category, onEdit, onDelete}) => {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Card isPressable className="transition-all duration-300" onClick={() => Haptics.impact({style: ImpactStyle.Medium})}>
                    <CardBody className="gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white" style={{backgroundColor: category.color}}>
                                    {category.icon ? <Icon icon={category.icon} /> : category.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{category.name}</h3>
                                </div>
                            </div>
                            <Chip color={category.budget_type === "income" ? "success" : "danger"} variant="flat" size="sm">
                                {category.budget_type === "income" ? "收入" : "支出"}
                            </Chip>
                        </div>
                    </CardBody>
                </Card>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="edit" textValue="編輯" onPress={() => onEdit(category)}>
                    <div className="flex items-center gap-2">
                        <Icon icon="mdi:pencil" className="text-lg" />
                        編輯
                    </div>
                </DropdownItem>
                <DropdownItem key="delete" textValue="刪除" onPress={() => onDelete(category)}>
                    <div className="flex items-center gap-2 text-danger-500">
                        <Icon icon="mdi:trash-can" className="text-lg" />
                        刪除
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
