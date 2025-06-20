import React, {useEffect, useMemo} from "react";
import {Spinner} from "@heroui/react";
import {useCategoryStore} from "@/stores/categoryStore";
import {CategoryCard} from "./CategoryCard";
import type {Category} from "@/types/Category";

interface CategoryListProps {
    searchQuery: string;
    typeFilter: "all" | "income" | "expense";
    onEditCategory: (category: Category) => void;
    onDeleteCategory: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({searchQuery, typeFilter, onEditCategory, onDeleteCategory}) => {
    const {categories, isLoading, error, fetchCategories} = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const filteredCategories = useMemo(() => {
        return categories.filter(category => {
            const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = typeFilter === "all" || category.budget_type === typeFilter;

            return matchesSearch && matchesType;
        });
    }, [categories, searchQuery, typeFilter]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner variant="simple" size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg font-medium text-red-500">載入失敗</p>
                    <p className="mt-2 text-gray-500">{error}</p>
                    <button onClick={fetchCategories} className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                        重新載入
                    </button>
                </div>
            </div>
        );
    }

    if (filteredCategories.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg text-gray-500">{searchQuery || typeFilter !== "all" ? "沒有找到符合條件的分類" : "還沒有任何分類"}</p>
                    <p className="mt-2 text-gray-400">{searchQuery || typeFilter !== "all" ? "請嘗試調整搜尋條件" : "點擊上方的「新增分類」按鈕來創建第一個分類"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map(category => (
                <CategoryCard key={category.id} category={category} onEdit={onEditCategory} onDelete={onDeleteCategory} />
            ))}
        </div>
    );
};
