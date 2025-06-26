import React, {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, DatePicker, SelectSection} from "@heroui/react";
import {useTransactionStore} from "@/stores/transactionStore";
import {useCategoryStore} from "@/stores/categoryStore";
import type {Transaction} from "@/types/Transaction";
import {parseAbsoluteToLocal, now, getLocalTimeZone, ZonedDateTime} from "@internationalized/date";
import {useIsDesktop} from "../hooks/useIsDesktop";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction?: Transaction | null;
}

interface FormData {
    category_id: number;
    amount: number;
    date: ZonedDateTime;
    description: string;
}

export const EditModal: React.FC<EditModalProps> = ({isOpen, onClose, transaction}) => {
    const {createTransaction, updateTransaction, isLoading} = useTransactionStore();
    const {categories} = useCategoryStore();
    const isDesktop = useIsDesktop();

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FormData>({
        defaultValues: {
            category_id: 0,
            amount: 0,
            date: now(getLocalTimeZone()),
            description: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        if (isOpen) {
            if (transaction) {
                const localDate = parseAbsoluteToLocal(transaction.date);

                reset({
                    category_id: transaction.category.id,
                    amount: Math.abs(transaction.amount),
                    date: localDate,
                    description: transaction.description || "",
                });
            } else {
                const localDate = now(getLocalTimeZone());

                reset({
                    category_id: 0,
                    amount: 0,
                    date: localDate,
                    description: "",
                });
            }
        }
    }, [transaction, isOpen, reset]);

    const onSubmit = async (data: FormData) => {
        try {
            const submitData = {
                category_id: data.category_id,
                amount: data.amount,
                date: data.date.toString(),
                description: data.description.trim() || undefined,
            };

            if (transaction) {
                await updateTransaction(transaction.id, submitData);
            } else {
                await createTransaction(submitData);
            }
            onClose();
        } catch (error) {
            console.error("提交失敗:", error);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose} size="lg" placement={isDesktop ? "center" : "top"} className="!mt-[calc(80px+env(safe-area-inset-top))]">
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader className="flex flex-col gap-1">{transaction ? "編輯交易" : "新增交易"}</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            {/* Category Selection */}
                            <Controller
                                name="category_id"
                                control={control}
                                rules={{
                                    required: "請選擇分類",
                                    validate: value => value > 0 || "請選擇有效的分類",
                                }}
                                render={({field}) => (
                                    <Select
                                        label="分類"
                                        placeholder="請選擇分類"
                                        selectedKeys={field.value > 0 ? [field.value.toString()] : []}
                                        onSelectionChange={keys => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            field.onChange(parseInt(selectedKey));
                                        }}
                                        isInvalid={!!errors.category_id}
                                        errorMessage={errors.category_id?.message}
                                    >
                                        <SelectSection title="收入">
                                            {categories
                                                .filter(category => category.budget_type === "income")
                                                .map(category => (
                                                    <SelectItem key={category.id} textValue={category.name}>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-3 w-3 rounded-full" style={{backgroundColor: category.color}} />
                                                            {category.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                        </SelectSection>
                                        <SelectSection title="支出">
                                            {categories
                                                .filter(category => category.budget_type === "expense")
                                                .map(category => (
                                                    <SelectItem key={category.id} textValue={category.name}>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-3 w-3 rounded-full" style={{backgroundColor: category.color}} />
                                                            {category.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                        </SelectSection>
                                    </Select>
                                )}
                            />

                            {/* Amount Input */}
                            <Controller
                                name="amount"
                                control={control}
                                rules={{
                                    required: "請輸入金額",
                                    min: {
                                        value: 0.01,
                                        message: "金額必須大於0",
                                    },
                                    validate: value => {
                                        if (isNaN(value)) return "請輸入有效的數字";
                                        return true;
                                    },
                                }}
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        type="number"
                                        step="0.01"
                                        label="金額"
                                        placeholder="請輸入金額"
                                        startContent={<span className="text-default-500">$</span>}
                                        value={field.value?.toString() || ""}
                                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                                        isInvalid={!!errors.amount}
                                        errorMessage={errors.amount?.message}
                                    />
                                )}
                            />

                            {/* Date Input */}
                            <Controller
                                name="date"
                                control={control}
                                rules={{required: "請選擇日期"}}
                                render={({field}) => (
                                    <DatePicker
                                        name={field.name}
                                        value={field.value}
                                        defaultValue={now(getLocalTimeZone())}
                                        onChange={field.onChange}
                                        hideTimeZone
                                        showMonthAndYearPickers
                                        aria-label="選擇交易日期"
                                    />
                                )}
                            />

                            {/* Description Input */}
                            <Controller name="description" control={control} render={({field}) => <Textarea {...field} label="備註" placeholder="請輸入交易備註（選填）" minRows={2} maxRows={4} />} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={handleClose}>
                            取消
                        </Button>
                        <Button color="primary" type="submit" isLoading={isLoading}>
                            {transaction ? "更新" : "新增"}
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
