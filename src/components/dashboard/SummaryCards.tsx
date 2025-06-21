import {Card, Skeleton} from "@heroui/react";
import {CardBody} from "@heroui/react";
import {useSummaryStore} from "@/stores/summaryStore";
import {Icon} from "@iconify/react";
import {NumberUtil} from "@/utils/NumberUtil";

export const SummaryCards = () => {
    const {summaryData, isLoading} = useSummaryStore();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {Array.from({length: 3}).map((_, index) => (
                    <Card key={index}>
                        <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
                            <Skeleton className="rounded-full">
                                <div className="h-12 w-12 rounded-full bg-default-200"></div>
                            </Skeleton>
                            <div className="flex flex-col items-end gap-2">
                                <Skeleton className="rounded-lg">
                                    <div className="h-4 w-16 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="rounded-lg">
                                    <div className="h-7 w-48 rounded-lg bg-default-200"></div>
                                </Skeleton>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="rounded-full bg-success-100 p-3">
                        <Icon icon="icon-park-outline:income" className="text-xl text-success-500" />
                    </div>
                    <div className="text-end">
                        <p className="text-sm text-default-500">總收入</p>
                        <p className="text-2xl font-bold text-success-500">{summaryData ? NumberUtil.formatCurrency(summaryData.total_income) : null}</p>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="rounded-full bg-danger-100 p-3">
                        <Icon icon="icon-park-outline:expenses" className="text-xl text-danger-500" />
                    </div>
                    <div className="text-end">
                        <p className="text-sm text-default-500">總支出</p>
                        <p className="text-2xl font-bold text-danger-500">{summaryData ? NumberUtil.formatCurrency(summaryData.total_expenses) : null}</p>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="rounded-full bg-primary-100 p-3">
                        <Icon icon="fa-solid:wallet" className="text-xl text-primary-500" />
                    </div>
                    <div className="text-end">
                        <p className="text-sm text-default-500">淨收益</p>
                        <p className={`text-2xl font-bold ${summaryData?.net_balance && summaryData.net_balance >= 0 ? "text-primary-500" : "text-danger-500"}`}>
                            {summaryData?.net_balance && summaryData.net_balance >= 0
                                ? `+${NumberUtil.formatCurrency(summaryData.net_balance)}`
                                : `-${NumberUtil.formatCurrency(Math.abs(summaryData?.net_balance || 0))}`}
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
