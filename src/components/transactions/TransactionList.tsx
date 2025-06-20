import React, {useEffect} from "react";
import {Spinner, Pagination} from "@heroui/react";
import {useTransactionStore} from "@/stores/transactionStore";
import {TransactionCard} from "./TransactionCard";
import type {Transaction} from "@/types/Transaction";

interface TransactionListProps {
    onEditTransaction: (transaction: Transaction) => void;
    onDeleteTransaction: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({onEditTransaction, onDeleteTransaction}) => {
    const {transactions, isLoading, pagination, filters, fetchTransactions, setFilters} = useTransactionStore();

    useEffect(() => {
        fetchTransactions();
    }, [filters, fetchTransactions]);

    const handlePageChange = (page: number) => {
        setFilters({page});
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner variant="simple" size="lg" />
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <p className="text-lg text-default-500">沒有找到交易記錄</p>
                    <p className="mt-2 text-default-400">點擊上方的「新增交易」按鈕來創建第一筆交易</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Transaction Grid */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {transactions.map(transaction => (
                    <TransactionCard key={transaction.id} transaction={transaction} onEdit={onEditTransaction} onDelete={onDeleteTransaction} />
                ))}
            </div>
            {/* Pagination Info */}
            <div className="flex justify-center">
                {pagination && <Pagination onChange={handlePageChange} showControls isCompact initialPage={pagination.current_page} total={pagination.total_pages} />}
            </div>
        </div>
    );
};
