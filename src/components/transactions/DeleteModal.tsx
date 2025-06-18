import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Chip, addToast} from "@heroui/react";
import {useTransactionStore} from "@/stores/transactionStore";
import type {Transaction} from "@/types/Transaction";
import {FaExclamationTriangle} from "react-icons/fa";
import moment from "moment";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction;
}

export const DeleteModal: React.FC<Props> = ({isOpen, onClose, transaction}) => {
    const isIncome = transaction.category.budget_type === "income";
    const amount = transaction.amount;

    const {deleteTransaction, isLoading} = useTransactionStore();
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTransaction(transaction.id);

            addToast({
                title: "刪除成功",
                description: `交易記錄已成功刪除`,
                color: "success",
            });

            onClose();
        } catch (error: any) {
            addToast({
                title: "刪除失敗",
                description: error.message || "無法刪除交易記錄，請稍後重試",
                color: "danger",
            });
            setIsDeleting(false);
        }
    };

    const handleClose = () => {
        if (!isDeleting) {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="md" placement="center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <FaExclamationTriangle className="text-red-500" />
                        刪除交易記錄
                    </div>
                </ModalHeader>

                <ModalBody>
                    <div className="flex flex-col gap-4">
                        {/* Warning Alert */}
                        <Card className="border border-red-200 bg-red-50">
                            <CardBody className="p-4">
                                <div className="flex items-start gap-3">
                                    <FaExclamationTriangle className="mt-0.5 flex-shrink-0 text-red-500" />
                                    <div>
                                        <h4 className="mb-1 font-semibold text-red-800">警告！</h4>
                                        <p className="text-sm text-red-700">此操作無法復原。刪除後將無法恢復此交易記錄。</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Transaction Info */}
                        <Card>
                            <CardBody className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white" style={{backgroundColor: transaction.category.color}}>
                                        {transaction.category.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{transaction.description || transaction.category.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {moment(transaction.date).format("YYYY-MM-DD HH:mm")} ({moment(transaction.date).fromNow()})
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <Chip className="absolute right-4 top-4" color={transaction.category.budget_type === "income" ? "success" : "danger"} variant="flat" size="sm">
                                            {transaction.category.name}
                                        </Chip>
                                        <div className={`mt-8 text-xl font-bold ${transaction.category.budget_type === "expense" ? "text-red-500" : "text-green-500"}`}>
                                            {isIncome ? "+" : "-"}${amount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <p className="text-center text-sm text-gray-600">確定要刪除這筆交易記錄嗎？</p>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button color="default" variant="light" onPress={handleClose} isDisabled={isDeleting}>
                        取消
                    </Button>
                    <Button color="danger" onPress={handleDelete} isLoading={isDeleting || isLoading}>
                        確認刪除
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
