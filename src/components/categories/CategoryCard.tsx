import React from "react";
import {Card, CardBody, Button, Chip} from "@heroui/react";
import type {Category} from "@/types/Category";
import {FaEdit, FaTrash} from "react-icons/fa";

interface CategoryCardProps {
    category: Category;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({category, onEdit, onDelete}) => {
    return (
        <Card className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
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

                <div className="mt-2 flex justify-start gap-2">
                    <Button isIconOnly size="sm" color="primary" variant="light" onPress={() => onEdit(category)}>
                        <FaEdit />
                    </Button>
                    <Button isIconOnly size="sm" color="danger" variant="light" onPress={() => onDelete(category)}>
                        <FaTrash />
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};
