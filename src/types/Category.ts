export interface Category {
    id: number;
    name: string;
    budget_type: "income" | "expense";
    color: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}
