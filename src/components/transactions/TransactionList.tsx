import React, {useEffect} from "react";
import {Pagination, Skeleton, Card, CardBody} from "@heroui/react";
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
            <div className="space-y-6">
                {/* Transaction Skeleton Grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {Array.from({length: 6}).map((_, index) => (
                        <Card key={index}>
                            <CardBody className="space-y-3 p-4">
                                {/* Top row: Icon + Title + Amount */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="rounded-full">
                                            <div className="h-12 w-12 rounded-full bg-default-200"></div>
                                        </Skeleton>
                                        <div className="flex flex-col gap-1">
                                            <Skeleton className="rounded-lg">
                                                <div className="h-4 w-32 rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                            <Skeleton className="rounded-lg">
                                                <div className="h-3 w-16 rounded-lg bg-default-200"></div>
                                            </Skeleton>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Skeleton className="rounded-lg">
                                            <div className="h-5 w-20 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="rounded-lg">
                                            <div className="h-3 w-12 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                    </div>
                                </div>

                                {/* Bottom row: Transaction time + Transaction type */}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="rounded-lg">
                                            <div className="h-3 w-12 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="rounded-lg">
                                            <div className="h-3 w-32 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Skeleton className="rounded-lg">
                                            <div className="h-3 w-12 rounded-lg bg-default-200"></div>
                                        </Skeleton>
                                        <Skeleton className="rounded-full">
                                            <div className="h-5 w-10 rounded-full bg-default-200"></div>
                                        </Skeleton>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
                {/* Pagination Skeleton */}
                <div className="flex justify-center">
                    <Skeleton className="rounded-lg">
                        <div className="h-8 w-64 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </div>
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
