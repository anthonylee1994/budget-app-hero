import {useState} from "react";
import {Button} from "@heroui/button";
import {Input, Select, SelectItem} from "@heroui/react";
import {useCategoryStore} from "@/stores/categoryStore";
import type {Category} from "@/types/Category";
import {CategoryList} from "@/components/categories/CategoryList";
import {StatsSection} from "@/components/categories/StatsSection";
import {EditModal} from "@/components/categories/EditModal";
import {DeleteModal} from "@/components/categories/DeleteModal";
import {Icon} from "@iconify/react";

export const CategoriesPage = () => {
    const {categories} = useCategoryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === "all" || category.budget_type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleOpenCreateModal = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleOpenDeleteModal = (category: Category) => {
        setDeletingCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingCategory(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="my-2 text-2xl font-bold lg:my-0 lg:text-3xl">分類管理</h2>
                <Button color="primary" onPress={handleOpenCreateModal}>
                    <Icon icon="mdi:plus" className="text-lg" />
                    新增分類
                </Button>
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Input fullWidth size="lg" placeholder="搜尋分類名稱..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} aria-label="搜尋分類名稱" />
                <Select
                    size="lg"
                    className="w-full flex-shrink-0 sm:w-48"
                    selectedKeys={[typeFilter]}
                    onSelectionChange={keys => {
                        const selectedKey = Array.from(keys)[0] as "all" | "income" | "expense";
                        setTypeFilter(selectedKey || "all");
                    }}
                    aria-label="選擇分類類型"
                >
                    <SelectItem key="all">全部類型</SelectItem>
                    <SelectItem key="income">收入</SelectItem>
                    <SelectItem key="expense">支出</SelectItem>
                </Select>
            </div>
            <CategoryList searchQuery={searchQuery} typeFilter={typeFilter} onEditCategory={handleOpenEditModal} onDeleteCategory={handleOpenDeleteModal} />
            <StatsSection categories={categories} filteredCategories={filteredCategories} />
            <EditModal isOpen={isModalOpen} onClose={handleCloseEditModal} category={editingCategory} />
            {deletingCategory && <DeleteModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} category={deletingCategory} />}
        </div>
    );
};
