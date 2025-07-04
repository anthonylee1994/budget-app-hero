import React, {useMemo} from "react";
import {Card, CardBody} from "@heroui/react";
import type {Category} from "@/types/Category";

interface StatsSectionProps {
    categories: Category[];
    filteredCategories: Category[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({categories, filteredCategories}) => {
    const stats = useMemo(() => {
        const incomeCount = categories.filter(cat => cat.budget_type === "income").length;
        const expenseCount = categories.filter(cat => cat.budget_type === "expense").length;

        return {
            total: categories.length,
            income: incomeCount,
            expense: expenseCount,
            displayed: filteredCategories.length,
        };
    }, [categories, filteredCategories]);

    const statCards = [
        {
            title: "總分類數",
            value: stats.total,
            color: "text-primary-500",
        },
        {
            title: "收入分類",
            value: stats.income,
            color: "text-success-500",
        },
        {
            title: "支出分類",
            value: stats.expense,
            color: "text-danger-500",
        },
        {
            title: "顯示中",
            value: stats.displayed,
            color: "text-default-500",
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statCards.map((stat, index) => (
                <Card key={index} className="bg-content1">
                    <CardBody className="p-4">
                        <div className="text-sm text-default-600">{stat.title}</div>
                        <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};
