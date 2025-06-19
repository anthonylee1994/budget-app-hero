import {useState} from "react";
import {Button} from "@heroui/button";
import type {Transaction} from "@/types/Transaction";
import {FilterSection} from "@/components/transactions/FilterSection";
import {TransactionList} from "@/components/transactions/TransactionList";
import {EditModal} from "@/components/transactions/EditModal";
import {DeleteModal} from "@/components/transactions/DeleteModal";
import {TransactionsStats} from "@/components/transactions/TransactionsStats";
import {Icon} from "@iconify/react";

export const TransactionsPage = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

    const handleOpenAddModal = () => {
        setEditingTransaction(null);
        setIsEditModalOpen(true);
    };

    const handleEditTransaction = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const handleDeleteTransaction = (transaction: Transaction) => {
        setDeletingTransaction(transaction);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingTransaction(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingTransaction(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="my-2 text-2xl font-bold lg:my-0 lg:text-3xl">交易記錄</h2>
                <Button color="primary" onPress={handleOpenAddModal}>
                    <Icon icon="mdi:plus" className="text-lg" />
                    新增交易
                </Button>
            </div>
            <FilterSection />
            <TransactionList onEditTransaction={handleEditTransaction} onDeleteTransaction={handleDeleteTransaction} />
            <TransactionsStats />
            <EditModal isOpen={isEditModalOpen} onClose={handleCloseEditModal} transaction={editingTransaction} />
            {deletingTransaction && <DeleteModal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} transaction={deletingTransaction} />}
        </div>
    );
};
