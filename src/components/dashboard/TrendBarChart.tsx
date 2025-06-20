import {useSummaryStore} from "@/stores/summaryStore";
import {NumberUtil} from "@/utils/NumberUtil";
import {Card, CardHeader, CardBody} from "@heroui/react";
import moment from "moment";
import {Bar} from "react-chartjs-2";
import {useTheme} from "next-themes";

export const TrendBarChart = () => {
    const {summaryData, selectedPeriod} = useSummaryStore();
    const {theme} = useTheme();

    const barChartData = {
        labels:
            summaryData?.bar_chart.map(item => {
                const date = new Date(item.date);
                if (selectedPeriod === "yearly") {
                    return moment(date).format("YYYY年M月");
                } else {
                    return moment(date).format("M月D日");
                }
            }) || [],
        datasets: [
            {
                label: "收入",
                data: summaryData?.bar_chart.map(item => item.income) || [],
                backgroundColor: "#10b981",
                borderColor: "#059669",
                borderWidth: 1,
            },
            {
                label: "支出",
                data: summaryData?.bar_chart.map(item => item.expense) || [],
                backgroundColor: "#ef4444",
                borderColor: "#dc2626",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    color: theme === "dark" ? "white" : undefined,
                    font: {
                        size: 12,
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : undefined,
                },
                grid: {
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : undefined,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: any) {
                        return NumberUtil.formatCurrency(value);
                    },
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : undefined,
                },
                grid: {
                    color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : undefined,
                },
            },
        },
    };

    return (
        <Card className="p-2">
            <CardHeader>
                <h3 className="text-lg font-semibold">{selectedPeriod === "weekly" ? "週" : selectedPeriod === "monthly" ? "月" : "年"}度收支趨勢</h3>
            </CardHeader>
            <CardBody>
                <div className={`h-[400px] ${selectedPeriod === "yearly" ? "min-w-[1000px]" : selectedPeriod === "monthly" ? "min-w-[2500px]" : "min-w-[600px]"}`}>
                    <Bar data={barChartData} options={chartOptions} />
                </div>
            </CardBody>
        </Card>
    );
};
