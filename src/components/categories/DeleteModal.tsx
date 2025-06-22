import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Chip, addToast} from "@heroui/react";
import {useCategoryStore} from "@/stores/categoryStore";
import type {Category} from "@/types/Category";
import {Icon} from "@iconify/react";
import {useIsDesktop} from "../hooks/useIsDesktop";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    category: Category;
}

export const DeleteModal: React.FC<Props> = ({isOpen, onClose, category}) => {
    const {deleteCategory, isLoading} = useCategoryStore();
    const [isDeleting, setIsDeleting] = React.useState(false);
    const isDesktop = useIsDesktop();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteCategory(category.id);

            addToast({
                title: "刪除成功",
                description: `分類「${category.name}」已成功刪除`,
                color: "success",
            });

            onClose();
        } catch (error: any) {
            addToast({
                title: "刪除失敗",
                description: error.message || "無法刪除分類，請稍後重試",
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
        <Modal isOpen={isOpen} onClose={handleClose} size="md" placement={isDesktop ? "center" : "top"} className="!mt-[calc(80px+env(safe-area-inset-top))]">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Icon icon="mdi:alert-circle" className="text-danger-500" />
                        刪除分類
                    </div>
                </ModalHeader>

                <ModalBody>
                    <div className="flex flex-col gap-4">
                        {/* Warning Alert */}
                        <Card className="border border-danger-200 bg-danger-50">
                            <CardBody className="p-4">
                                <div className="flex items-start gap-3">
                                    <Icon icon="mdi:alert-circle" className="mt-0.5 flex-shrink-0 text-danger-500" />
                                    <div>
                                        <h4 className="mb-1 font-semibold text-danger-800">警告！</h4>
                                        <p className="text-sm text-danger-700">此操作無法復原。刪除分類後，所有相關的交易紀錄可能會受到影響。</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Category Info */}
                        <Card className="border border-default-200 bg-default-50">
                            <CardBody className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full" style={{backgroundColor: category.color}} />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{category.name}</h3>
                                    </div>
                                    <Chip color={category.budget_type === "income" ? "success" : "danger"} variant="flat" size="sm">
                                        {category.budget_type === "income" ? "收入" : "支出"}
                                    </Chip>
                                </div>
                            </CardBody>
                        </Card>

                        <p className="text-center text-sm text-default-600">
                            確定要刪除分類「<span className="font-semibold">{category.name}</span>」嗎？
                        </p>
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
