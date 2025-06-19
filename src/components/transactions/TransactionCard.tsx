import React from "react";
import {Card, CardBody, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
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
        <Dropdown>
            <DropdownTrigger>
                <Card isPressable className="transition-all duration-300">
                    <CardBody className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-1 items-center gap-3">
                                {/* Category Icon */}
                                <div className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-white" style={{backgroundColor: transaction.category.color}}>
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

                        <div className="flex items-center justify-end">
                            <div className={`text-xl font-bold ${transaction.category.budget_type === "expense" ? "text-red-500" : "text-green-500"}`}>
                                {isIncome ? "+" : "-"}${amount.toLocaleString()}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="edit" onPress={() => onEdit(transaction)}>
                    <div className="flex items-center gap-2">
                        <FaEdit size={12} />
                        編輯
                    </div>
                </DropdownItem>
                <DropdownItem key="delete" onPress={() => onDelete(transaction)}>
                    <div className="flex items-center gap-2 text-red-500">
                        <FaTrash size={12} />
                        刪除
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
