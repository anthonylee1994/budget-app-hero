import {Card, CardBody} from "@heroui/react";
import {useTransactionStore} from "@/stores/transactionStore";
import {NumberUtil} from "@/utils/NumberUtil";

export const TransactionsStats = () => {
    const {summary, pagination, isLoading} = useTransactionStore();

    if (!summary || isLoading) {
        return null;
    }

    const totalIncome = summary.total_income || 0;
    const totalExpense = summary.total_expenses || 0;
    const netAmount = summary.net_balance || 0;
    const transactionCount = pagination?.total_entries || 0;

    const statsData = [
        {
            label: "總收入",
            value: `+${NumberUtil.formatCurrency(totalIncome)}`,
            color: "text-green-500",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            borderColor: "border-green-200 dark:border-green-800",
        },
        {
            label: "總支出",
            value: `-${NumberUtil.formatCurrency(totalExpense)}`,
            color: "text-red-500",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            borderColor: "border-red-200 dark:border-red-800",
        },
        {
            label: "淨收益",
            value: netAmount >= 0 ? `+${NumberUtil.formatCurrency(netAmount)}` : `-${NumberUtil.formatCurrency(Math.abs(netAmount))}`,
            color: netAmount >= 0 ? "text-green-500" : "text-red-500",
            bgColor: netAmount >= 0 ? "bg-green-50 dark:bg-green-900/20" : "bg-red-50 dark:bg-red-900/20",
            borderColor: netAmount >= 0 ? "border-green-200 dark:border-green-800" : "border-red-200 dark:border-red-800",
        },
        {
            label: "交易筆數",
            value: transactionCount.toString(),
            color: "text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-200 dark:border-blue-800",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
                <Card key={index} className={`${stat.bgColor} ${stat.borderColor} border transition-all duration-200 hover:shadow-lg`}>
                    <CardBody className="p-4 text-end">
                        <div className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};
