import {Card} from "@heroui/react";
import {CardBody} from "@heroui/react";
import {useSummaryStore} from "@/stores/summaryStore";
import {Icon} from "@iconify/react";
import {NumberUtil} from "@/utils/NumberUtil";

export const SummaryCards = () => {
    const {summaryData} = useSummaryStore();

    if (!summaryData) return null;

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="rounded-full bg-green-100 p-3">
                        <Icon icon="icon-park-outline:income" className="text-xl text-green-600" />
                    </div>
                    <div className="text-end">
                        <p className="text-sm text-gray-600">總收入</p>
                        <p className="text-2xl font-bold text-green-600">{NumberUtil.formatCurrency(summaryData.total_income)}</p>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="rounded-full bg-red-100 p-3">
                        <Icon icon="icon-park-outline:expenses" className="text-xl text-red-600" />
                    </div>
                    <div className="text-end">
                        <p className="text-sm text-gray-600">總支出</p>
                        <p className="text-2xl font-bold text-red-600">{NumberUtil.formatCurrency(summaryData.total_expenses)}</p>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="flex flex-row items-center justify-between gap-4 p-4">
                    <div className="rounded-full bg-blue-100 p-3">
                        <Icon icon="fa-solid:wallet" className="text-xl text-blue-600" />
                    </div>
                    <div className="text-end">
                        <p className="text-sm text-gray-600">淨收益</p>
                        <p className={`text-2xl font-bold ${summaryData.net_balance >= 0 ? "text-blue-600" : "text-red-600"}`}>
                            {summaryData.net_balance >= 0 ? `+${NumberUtil.formatCurrency(summaryData.net_balance)}` : `-${NumberUtil.formatCurrency(Math.abs(summaryData.net_balance))}`}
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
