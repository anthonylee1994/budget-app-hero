export interface Transaction {
    id: number;
    user_id: number;
    category_id: number;
    category: {
        id: number;
        name: string;
        budget_type?: "income" | "expense";
        color: string;
        icon: string | null;
    };
    amount: number;
    date: string; // YYYY-MM-DD format
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface TransactionSummary {
    total_income: number;
    total_expenses: number;
    net_balance: number;
}

export interface PaginationInfo {
    current_page: number;
    per_page: number;
    total_entries: number;
    total_pages: number;
}

export interface TransactionsResponse {
    transactions: Transaction[];
    summary: TransactionSummary;
    pagination: PaginationInfo;
}
