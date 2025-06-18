import {Card} from "@heroui/react";
import {CardBody} from "@heroui/react";
import {FaArrowDown, FaArrowUp, FaWallet} from "react-icons/fa";
import {useSummaryStore} from "@/stores/summaryStore";

export const SummaryCards = () => {
    const {summaryData} = useSummaryStore();

    if (!summaryData) return null;

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
                <CardBody className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-green-100 p-3">
                        <FaArrowUp className="text-xl text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">總收入</p>
                        <p className="text-2xl font-bold text-green-600">${summaryData.total_income.toLocaleString()}</p>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-red-100 p-3">
                        <FaArrowDown className="text-xl text-red-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">總支出</p>
                        <p className="text-2xl font-bold text-red-600">${summaryData.total_expenses.toLocaleString()}</p>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody className="flex flex-row items-center gap-4">
                    <div className="rounded-full bg-blue-100 p-3">
                        <FaWallet className="text-xl text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">淨收益</p>
                        <p className={`text-2xl font-bold ${summaryData.net_balance >= 0 ? "text-blue-600" : "text-red-600"}`}>${summaryData.net_balance.toLocaleString()}</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
