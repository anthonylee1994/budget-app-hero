import {create} from "zustand";
import {persist} from "zustand/middleware";
import {apiClient} from "../utils/apiClient";
import type {Transaction, TransactionsResponse, PaginationInfo, TransactionSummary} from "../types/Transaction";

interface CreateTransactionData {
    category_id: number;
    amount: number;
    date: string; // ISO datetime format in client timezone (e.g., 2024-01-10T10:00:00+08:00)
    description?: string;
}

interface UpdateTransactionData {
    category_id?: number;
    amount?: number;
    date?: string; // ISO datetime format in client timezone (e.g., 2024-01-10T10:00:00+08:00)
    description?: string;
}

interface TransactionFilters {
    page?: number;
    period?: "weekly" | "monthly" | "yearly"; // Add period for API filtering
    date?: string; // YYYY-MM-DD format, base date for period calculation
    budget_type?: "income" | "expense";
    category_id?: number; // Filter by specific category ID
    by_amount?: "asc" | "desc";
    recent?: "asc" | "desc";
}

interface TransactionState {
    transactions: Transaction[];
    summary: TransactionSummary | null;
    pagination: PaginationInfo | null;
    isLoading: boolean;
    error: string | null;

    // Filter state
    filters: TransactionFilters;

    // Actions
    fetchTransactions: (filters?: TransactionFilters) => Promise<void>;
    getTransactionById: (id: number) => Promise<Transaction>;
    createTransaction: (data: CreateTransactionData) => Promise<Transaction>;
    updateTransaction: (id: number, data: UpdateTransactionData) => Promise<Transaction>;
    deleteTransaction: (id: number) => Promise<void>;
    clearError: () => void;
    clearTransactions: () => void;

    // Filter actions
    setFilters: (filters: Partial<TransactionFilters>) => void;
    resetFilters: () => void;
}

const defaultFilters: TransactionFilters = {
    page: 1,
    period: "monthly",
    budget_type: undefined,
    category_id: undefined,
    by_amount: undefined,
    recent: "desc",
};

export const useTransactionStore = create<TransactionState>()(
    persist(
        (set, get) => ({
            transactions: [],
            summary: null,
            pagination: null,
            isLoading: false,
            error: null,
            filters: defaultFilters,

            clearError: () => {
                set({error: null});
            },

            clearTransactions: () => {
                set({transactions: [], summary: null, pagination: null});
            },

            setFilters: (newFilters: Partial<TransactionFilters>) => {
                set(state => ({
                    filters: {...state.filters, ...newFilters},
                }));
            },

            resetFilters: () => {
                set({filters: defaultFilters});
            },

            fetchTransactions: async (overrideFilters?: TransactionFilters) => {
                set({isLoading: true, error: null});
                try {
                    // Use stored filters merged with any override filters
                    const {filters: storedFilters} = get();
                    const filters = overrideFilters ? {...storedFilters, ...overrideFilters} : storedFilters;

                    // Build query parameters
                    const params = new URLSearchParams();
                    params.append("per_page", "10");

                    if (filters.page) params.append("page", filters.page.toString());
                    if (filters.period) params.append("period", filters.period);
                    if (filters.date) params.append("date", filters.date); // Pass as YYYY-MM-DD
                    if (filters.budget_type) params.append("budget_type", filters.budget_type);
                    if (filters.category_id) params.append("category_id", filters.category_id.toString());
                    if (filters.by_amount) params.append("by_amount", filters.by_amount);
                    if (filters.recent) params.append("recent", filters.recent);

                    const queryString = params.toString();
                    const url = queryString ? `/transactions?${queryString}` : "/transactions";

                    const response = await apiClient.get(url);
                    const data: TransactionsResponse = response.data;

                    set({
                        transactions: data.transactions,
                        summary: data.summary,
                        pagination: data.pagination,
                        isLoading: false,
                    });
                } catch (error: any) {
                    console.error("Fetch transactions error:", error);
                    set({error: "獲取交易紀錄失敗", isLoading: false});
                    throw error;
                }
            },

            getTransactionById: async (id: number) => {
                set({error: null});
                try {
                    const response = await apiClient.get(`/transactions/${id}`);
                    const transaction: Transaction = response.data;
                    return transaction;
                } catch (error: any) {
                    console.error("Get transaction error:", error);
                    set({error: "獲取交易詳情失敗"});
                    throw error;
                }
            },

            createTransaction: async (data: CreateTransactionData) => {
                set({error: null});
                try {
                    const response = await apiClient.post("/transactions", data);
                    const newTransaction: Transaction = response.data;
                    get().fetchTransactions();

                    return newTransaction;
                } catch (error: any) {
                    console.error("Create transaction error:", error);
                    set({error: "創建交易失敗"});
                    throw error;
                }
            },

            updateTransaction: async (id: number, data: UpdateTransactionData) => {
                set({error: null});
                try {
                    const response = await apiClient.put(`/transactions/${id}`, data);
                    const updatedTransaction: Transaction = response.data;

                    // Update the transaction in the local state
                    const {transactions} = get();
                    const updatedTransactions = transactions.map(transaction => (transaction.id === id ? updatedTransaction : transaction));
                    set({transactions: updatedTransactions});

                    return updatedTransaction;
                } catch (error: any) {
                    console.error("Update transaction error:", error);
                    set({error: "更新交易失敗"});
                    throw error;
                }
            },

            deleteTransaction: async (id: number) => {
                set({error: null});
                try {
                    await apiClient.delete(`/transactions/${id}`);

                    // Remove the transaction from local state
                    const {transactions} = get();
                    const filteredTransactions = transactions.filter(transaction => transaction.id !== id);
                    set({transactions: filteredTransactions});
                } catch (error: any) {
                    console.error("Delete transaction error:", error);
                    set({error: "刪除交易失敗"});
                    throw error;
                }
            },
        }),
        {
            name: "transaction-filters",
            partialize: state => ({filters: state.filters}),
        }
    )
);
