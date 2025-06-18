import React from "react";
import {Card, CardBody, Button, Chip} from "@heroui/react";
import {FaEdit, FaTrash} from "react-icons/fa";
import type {Transaction} from "@/types/Transaction";
import moment from "moment";

interface TransactionCardProps {
    transaction: Transaction;
    onEdit: (transaction: Transaction) => void;
    onDelete: (transaction: Transaction) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({transaction, onEdit, onDelete}) => {
    const isIncome = transaction.category.budget_type === "income";
    const amount = transaction.amount;

    const getCategoryIcon = (categoryName: string) => {
        return categoryName.charAt(0).toUpperCase();
    };

    return (
        <Card className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
            <CardBody className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-1 items-center gap-3">
                        {/* Category Icon */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white" style={{backgroundColor: transaction.category.color}}>
                            {getCategoryIcon(transaction.category.name)}
                        </div>

                        {/* Transaction Info */}
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-lg font-semibold">{transaction.description || transaction.category.name}</h3>
                            <p className="text-sm text-gray-500">
                                {moment(transaction.date).format("YYYY-MM-DD HH:mm")} ({moment(transaction.date).fromNow()})
                            </p>
                        </div>
                    </div>

                    <Chip className="absolute right-4 top-4" color={transaction.category.budget_type === "income" ? "success" : "danger"} variant="flat" size="sm">
                        {transaction.category.name}
                    </Chip>
                </div>

                <div className="flex items-center justify-between">
                    <div className="mt-3 flex justify-end gap-2">
                        <Button isIconOnly size="sm" variant="light" color="primary" onPress={() => onEdit(transaction)}>
                            <FaEdit size={12} />
                        </Button>
                        <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => onDelete(transaction)}>
                            <FaTrash size={12} />
                        </Button>
                    </div>
                    <div className={`text-xl font-bold ${transaction.category.budget_type === "expense" ? "text-red-500" : "text-green-500"}`}>
                        {isIncome ? "+" : "-"}${amount.toLocaleString()}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
