import {create} from "zustand";
import {apiClient} from "../utils/apiClient";
import type {Category} from "../types/Category";

interface UpdateCategoryData {
    name?: string;
    budget_type?: "income" | "expense";
    color?: string;
}

interface CreateCategoryData {
    name: string;
    budget_type: "income" | "expense";
    color: string;
}

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    getCategoryById: (id: number) => Promise<Category>;
    createCategory: (data: CreateCategoryData) => Promise<Category>;
    updateCategory: (id: number, data: UpdateCategoryData) => Promise<Category>;
    deleteCategory: (id: number) => Promise<void>;
    clearError: () => void;
}

export const useCategoryStore = create<CategoryState>()((set, get) => ({
    categories: [],
    isLoading: false,
    error: null,

    clearError: () => {
        set({error: null});
    },

    fetchCategories: async () => {
        set({isLoading: true, error: null});
        try {
            const response = await apiClient.get("/categories");
            const categories: Category[] = response.data;
            set({categories, isLoading: false});
        } catch (error: any) {
            console.error("Fetch categories error:", error);
            set({error: "獲取分類失敗", isLoading: false});
            throw error;
        }
    },

    getCategoryById: async (id: number) => {
        set({error: null});
        try {
            const response = await apiClient.get(`/categories/${id}`);
            const category: Category = response.data;
            return category;
        } catch (error: any) {
            console.error("Get category error:", error);
            set({error: "獲取分類詳情失敗"});
            throw error;
        }
    },

    createCategory: async (data: CreateCategoryData) => {
        set({error: null});
        try {
            const response = await apiClient.post("/categories", data);
            const newCategory: Category = response.data;
            get().fetchCategories();

            return newCategory;
        } catch (error: any) {
            console.error("Create category error:", error);
            set({error: "創建分類失敗"});
            throw error;
        }
    },

    updateCategory: async (id: number, data: UpdateCategoryData) => {
        set({error: null});
        try {
            const response = await apiClient.put(`/categories/${id}`, data);
            const updatedCategory: Category = response.data;

            // Update the category in the local state
            const {categories} = get();
            const updatedCategories = categories.map(category => (category.id === id ? updatedCategory : category));
            set({categories: updatedCategories});

            return updatedCategory;
        } catch (error: any) {
            console.error("Update category error:", error);
            set({error: "更新分類失敗"});
            throw error;
        }
    },

    deleteCategory: async (id: number) => {
        set({error: null});
        try {
            await apiClient.delete(`/categories/${id}`);

            // Remove the category from local state
            const {categories} = get();
            const filteredCategories = categories.filter(category => category.id !== id);
            set({categories: filteredCategories});
        } catch (error: any) {
            console.error("Delete category error:", error);
            set({error: "刪除分類失敗"});
            throw error;
        }
    },
}));
