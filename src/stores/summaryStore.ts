import {create} from "zustand";
import {persist} from "zustand/middleware";
import {apiClient} from "../utils/apiClient";

interface DonutChartItem {
    name: string;
    amount: number;
    color: string;
    percentage: number;
}

interface BarChartItem {
    date: string; // YYYY-MM-DD for weekly/monthly, YYYY-MM for yearly
    income: number;
    expense: number;
    net: number;
}

interface DonutChart {
    income: DonutChartItem[];
    expense: DonutChartItem[];
}

interface SummaryData {
    total_income: number;
    total_expenses: number;
    net_balance: number;
    donut_chart: DonutChart;
    bar_chart: BarChartItem[];
    period: "weekly" | "monthly" | "yearly";
}

interface SummaryQueryParams {
    period: "weekly" | "monthly" | "yearly";
    date?: string; // YYYY-MM-DD format, optional
}

interface SummaryState {
    summaryData: SummaryData | null;
    isLoading: boolean;
    error: string | null;
    selectedPeriod: "weekly" | "monthly" | "yearly";
    fetchSummary: (params?: SummaryQueryParams) => Promise<SummaryData>;
    setPeriod: (period: "weekly" | "monthly" | "yearly") => void;
    clearError: () => void;
}

export const useSummaryStore = create<SummaryState>()(
    persist(
        (set, get) => ({
            summaryData: null,
            isLoading: false,
            error: null,
            selectedPeriod: "weekly", // default period

            clearError: () => {
                set({error: null});
            },

            setPeriod: (period: "weekly" | "monthly" | "yearly") => {
                set({selectedPeriod: period});
            },

            fetchSummary: async (params?: SummaryQueryParams) => {
                set({isLoading: true, error: null});
                try {
                    const {selectedPeriod} = get();
                    const queryParams = new URLSearchParams({
                        period: params?.period || selectedPeriod,
                        ...(params?.date && {date: params.date}),
                    });

                    const response = await apiClient.get(`/summary?${queryParams.toString()}`);
                    const summaryData: SummaryData = response.data;

                    set({summaryData, isLoading: false});
                    return summaryData;
                } catch (error: any) {
                    console.error("Fetch summary error:", error);
                    set({error: "獲取統計數據失敗", isLoading: false});
                    throw error;
                }
            },
        }),
        {
            name: "summary-settings",
            partialize: state => ({selectedPeriod: state.selectedPeriod}),
        }
    )
);
