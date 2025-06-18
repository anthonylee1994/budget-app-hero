import {useState} from "react";
import {MainLayout} from "@/components/common/MainLayout";
import {Button} from "@heroui/button";
import {Input, Select, SelectItem} from "@heroui/react";
import {EditModal, CategoryList, StatsSection} from "@/components/categories";
import {useCategoryStore} from "@/stores/categoryStore";
import type {Category} from "@/types/Category";

export const CategoriesPage = () => {
    const {categories} = useCategoryStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<"all" | "income" | "expense">("all");

    // Calculate filtered categories for stats
    const filteredCategories = categories.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === "all" || category.budget_type === typeFilter;
        return matchesSearch && matchesType;
    });

    const handleOpenModal = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="my-2 text-2xl font-bold lg:my-0 lg:text-3xl">分類管理</h2>
                    <Button color="primary" onPress={handleOpenModal}>
                        新增分類
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                    <Input fullWidth size="lg" placeholder="搜尋分類名稱..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <Select
                        size="lg"
                        className="w-full flex-shrink-0 sm:w-48"
                        selectedKeys={[typeFilter]}
                        onSelectionChange={keys => {
                            const selectedKey = Array.from(keys)[0] as "all" | "income" | "expense";
                            setTypeFilter(selectedKey);
                        }}
                    >
                        <SelectItem key="all">全部類型</SelectItem>
                        <SelectItem key="income">收入</SelectItem>
                        <SelectItem key="expense">支出</SelectItem>
                    </Select>
                </div>

                {/* Category List */}
                <CategoryList searchQuery={searchQuery} typeFilter={typeFilter} onEditCategory={handleEditCategory} />

                {/* Stats Section */}
                <StatsSection categories={categories} filteredCategories={filteredCategories} />

                {/* Edit Modal */}
                <EditModal isOpen={isModalOpen} onClose={handleCloseModal} category={editingCategory} />
            </div>
        </MainLayout>
    );
};
