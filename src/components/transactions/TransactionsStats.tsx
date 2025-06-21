import {Card, CardBody, Skeleton} from "@heroui/react";
import {useTransactionStore} from "@/stores/transactionStore";
import {NumberUtil} from "@/utils/NumberUtil";

export const TransactionsStats = () => {
    const {summary, pagination, isLoading} = useTransactionStore();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({length: 4}).map((_, index) => (
                    <Card key={index} className="transition-all duration-200">
                        <CardBody className="p-4 text-end">
                            <div className="mb-3">
                                <Skeleton className="rounded-lg">
                                    <div className="h-4 w-16 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </div>
                            <div>
                                <Skeleton className="rounded-lg">
                                    <div className="h-8 w-24 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        );
    }

    const totalIncome = summary?.total_income || 0;
    const totalExpense = summary?.total_expenses || 0;
    const netAmount = summary?.net_balance || 0;
    const transactionCount = pagination?.total_entries || 0;

    const statsData = [
        {
            label: "總收入",
            value: `+${NumberUtil.formatCurrency(totalIncome)}`,
            color: "text-success-500",
            bgColor: "bg-success-50",
            borderColor: "border-success-200",
        },
        {
            label: "總支出",
            value: `-${NumberUtil.formatCurrency(totalExpense)}`,
            color: "text-danger-500",
            bgColor: "bg-danger-50",
            borderColor: "border-danger-200",
        },
        {
            label: "淨收益",
            value: netAmount >= 0 ? `+${NumberUtil.formatCurrency(netAmount)}` : `-${NumberUtil.formatCurrency(Math.abs(netAmount))}`,
            color: netAmount >= 0 ? "text-success-500" : "text-danger-500",
            bgColor: netAmount >= 0 ? "bg-success-50" : "bg-danger-50",
            borderColor: netAmount >= 0 ? "border-success-200" : "border-danger-200",
        },
        {
            label: "交易筆數",
            value: transactionCount.toString(),
            color: "text-primary-500",
            bgColor: "bg-primary-50",
            borderColor: "border-primary-200",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
                <Card key={index} className={`${stat.bgColor} ${stat.borderColor} border transition-all duration-200 hover:shadow-lg`}>
                    <CardBody className="p-4 text-end">
                        <div className="mb-1 text-sm font-medium text-default-600">{stat.label}</div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};
