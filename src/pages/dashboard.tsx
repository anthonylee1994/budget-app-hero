import {MainNavBar} from "@/components/common/MainNavBar";
import React, {useEffect} from "react";
import {useSummaryStore} from "@/stores/summaryStore";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
import {Bar, Doughnut} from "react-chartjs-2";
import {Card, CardBody, CardHeader, Tab, Tabs} from "@heroui/react";
import {Spinner} from "@heroui/react";
import {FaArrowDown, FaArrowUp, FaWallet} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const DashboardPage = () => {
    const {summaryData, isLoading, selectedPeriod, fetchSummary, setPeriod} = useSummaryStore();

    useEffect(() => {
        fetchSummary();
    }, [selectedPeriod]);

    const handlePeriodChange = (period: "weekly" | "monthly" | "yearly") => {
        setPeriod(period);
        fetchSummary({period});
    };

    // Prepare donut chart data for income
    const incomeDonutData = {
        labels: summaryData?.donut_chart.income.map(item => item.name) || [],
        datasets: [
            {
                data: summaryData?.donut_chart.income.map(item => item.amount) || [],
                backgroundColor: summaryData?.donut_chart.income.map(item => item.color) || [],
                borderWidth: 2,
                borderColor: "#ffffff",
            },
        ],
    };

    // Prepare donut chart data for expenses
    const expenseDonutData = {
        labels: summaryData?.donut_chart.expense.map(item => item.name) || [],
        datasets: [
            {
                data: summaryData?.donut_chart.expense.map(item => item.amount) || [],
                backgroundColor: summaryData?.donut_chart.expense.map(item => item.color) || [],
                borderWidth: 2,
                borderColor: "#ffffff",
            },
        ],
    };

    // Prepare bar chart data
    const barChartData = {
        labels:
            summaryData?.bar_chart.map(item => {
                const date = new Date(item.date);
                if (selectedPeriod === "yearly") {
                    return date.toLocaleDateString("zh-TW", {year: "numeric", month: "short"});
                } else if (selectedPeriod === "monthly") {
                    return date.toLocaleDateString("zh-TW", {month: "short", day: "numeric"});
                } else {
                    return date.toLocaleDateString("zh-TW", {month: "short", day: "numeric"});
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
            {
                label: "淨收益",
                data: summaryData?.bar_chart.map(item => item.net) || [],
                backgroundColor: "#3b82f6",
                borderColor: "#2563eb",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
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
                        return `$${value.toLocaleString()}`;
                    },
                },
            },
        },
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
                        return `${context.label}: $${context.parsed.toLocaleString()} (${item?.percentage.toFixed(1)}%)`;
                    },
                },
            },
        },
    };

    return (
        <React.Fragment>
            <MainNavBar />
            <div className="container mx-auto max-w-5xl space-y-6 p-4">
                <h2 className="text-2xl font-bold">統計分析</h2>
                <Tabs selectedKey={selectedPeriod} onSelectionChange={key => handlePeriodChange(key as "weekly" | "monthly" | "yearly")}>
                    <Tab key="weekly" title="本週" />
                    <Tab key="monthly" title="本月" />
                    <Tab key="yearly" title="今年" />
                </Tabs>

                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Spinner size="lg" />
                    </div>
                ) : summaryData ? (
                    <>
                        {/* Summary Cards */}
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

                        {/* Charts */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Income Donut Chart */}
                            {summaryData.donut_chart.income.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <h3 className="text-lg font-semibold">收入分佈</h3>
                                    </CardHeader>
                                    <CardBody className="flex h-[300px] items-center justify-center">
                                        <Doughnut data={incomeDonutData} options={donutOptions} />
                                    </CardBody>
                                </Card>
                            )}

                            {/* Expense Donut Chart */}
                            {summaryData.donut_chart.expense.length > 0 && (
                                <Card>
                                    <CardHeader>
                                        <h3 className="text-lg font-semibold">支出分佈</h3>
                                    </CardHeader>
                                    <CardBody className="flex h-[300px] items-center justify-center">
                                        <Doughnut data={expenseDonutData} options={donutOptions} />
                                    </CardBody>
                                </Card>
                            )}
                        </div>

                        {/* Bar Chart */}
                        {summaryData.bar_chart.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <h3 className="text-lg font-semibold">{selectedPeriod === "weekly" ? "週" : selectedPeriod === "monthly" ? "月" : "年"}度趨勢</h3>
                                </CardHeader>
                                <CardBody>
                                    <div className="h-96">
                                        <Bar data={barChartData} options={chartOptions} />
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </>
                ) : (
                    <Card>
                        <CardBody className="text-center">
                            <p className="text-gray-500">暫無資料</p>
                        </CardBody>
                    </Card>
                )}
            </div>
        </React.Fragment>
    );
};
