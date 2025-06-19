import {useSummaryStore} from "@/stores/summaryStore";
import {NumberUtil} from "@/utils/NumberUtil";
import {Card, CardHeader, CardBody} from "@heroui/react";
import moment from "moment";
import {Bar} from "react-chartjs-2";

export const TrendBarChart = () => {
    const {summaryData, selectedPeriod} = useSummaryStore();

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
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: any) {
                        return NumberUtil.formatCurrency(value);
                    },
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
