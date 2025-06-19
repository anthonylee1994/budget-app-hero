import {useSummaryStore} from "@/stores/summaryStore";
import {NumberUtil} from "@/utils/NumberUtil";
import {Card, CardBody, CardHeader} from "@heroui/react";
import {Doughnut} from "react-chartjs-2";

export const ExpenseDonutChart = () => {
    const {summaryData, selectedPeriod} = useSummaryStore();

    const expenseDonutData = {
        labels: summaryData?.donut_chart.expense.map(item => item.name) || [],
        datasets: [
            {
                data: summaryData?.donut_chart.expense.map(item => item.amount) || [],
                backgroundColor: summaryData?.donut_chart.expense.map(item => item.color) || [],
                borderWidth: 2,
                borderColor: "transparent",
            },
        ],
    };

    const donutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom" as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const item =
                            selectedPeriod === "weekly"
                                ? summaryData?.donut_chart.income[context.dataIndex] || summaryData?.donut_chart.expense[context.dataIndex]
                                : summaryData?.donut_chart.income[context.dataIndex] || summaryData?.donut_chart.expense[context.dataIndex];
                        return `${context.label}: ${NumberUtil.formatCurrency(context.parsed)} (${item?.percentage.toFixed(1)}%)`;
                    },
                },
            },
        },
    };

    return (
        <Card className="p-2">
            <CardHeader>
                <h3 className="text-lg font-semibold">支出分佈</h3>
            </CardHeader>
            <CardBody className="flex h-[400px] items-center justify-center">
                <Doughnut data={expenseDonutData} options={donutOptions} />
            </CardBody>
        </Card>
    );
};
