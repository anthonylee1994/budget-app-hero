import React, {useEffect} from "react";
import {useSummaryStore} from "@/stores/summaryStore";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
import {Tab, Tabs} from "@heroui/react";
import {SummaryCards} from "@/components/dashboard/SummaryCards";
import {IncomeDonutChart} from "@/components/dashboard/IncomeDonutChart";
import {ExpenseDonutChart} from "@/components/dashboard/ExpenseDonutChart";
import {TrendBarChart} from "@/components/dashboard/TrendBarChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const DashboardPage = () => {
    const {summaryData, selectedPeriod, fetchSummary, setPeriod} = useSummaryStore();

    const handlePeriodChange = (period: "weekly" | "monthly" | "yearly") => {
        setPeriod(period);
        fetchSummary({period});
    };

    useEffect(() => {
        fetchSummary();
    }, [selectedPeriod]);

    return (
        <React.Fragment>
            <h2 className="my-2 text-2xl font-bold lg:my-0 lg:text-3xl">統計分析</h2>
            <Tabs
                className="md:w-1/4"
                fullWidth
                selectedKey={selectedPeriod}
                onSelectionChange={key => (key === selectedPeriod ? undefined : handlePeriodChange(key as "weekly" | "monthly" | "yearly"))}
            >
                <Tab key="weekly" title="本週" />
                <Tab key="monthly" title="本月" />
                <Tab key="yearly" title="今年" />
            </Tabs>

            <React.Fragment>
                <SummaryCards />
                <div className={`grid grid-cols-1 gap-6 ${summaryData && summaryData.donut_chart.income.length > 0 && summaryData.donut_chart.expense.length > 0 ? "lg:grid-cols-2" : ""}`}>
                    {summaryData && summaryData.donut_chart.income.length > 0 && <IncomeDonutChart />}
                    {summaryData && summaryData.donut_chart.expense.length > 0 && <ExpenseDonutChart />}
                </div>
                {summaryData && summaryData.bar_chart.length > 0 && <TrendBarChart />}
            </React.Fragment>
        </React.Fragment>
    );
};
