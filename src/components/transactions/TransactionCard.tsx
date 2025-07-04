import React from "react";
import {Card, CardBody, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, CardFooter} from "@heroui/react";
import type {Transaction} from "@/types/Transaction";
import moment from "moment";
import {Icon} from "@iconify/react";
import {NumberUtil} from "@/utils/NumberUtil";
import {Haptics, ImpactStyle} from "@capacitor/haptics";

interface TransactionCardProps {
    transaction: Transaction;
    onEdit: (transaction: Transaction) => void;
    onDelete: (transaction: Transaction) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({transaction, onEdit, onDelete}) => {
    const isIncome = transaction.category.budget_type === "income";
    const amount = transaction.amount;

    return (
        <Dropdown>
            <DropdownTrigger>
                <Card isPressable className="transition-all duration-300" onClick={() => Haptics.impact({style: ImpactStyle.Medium})}>
                    <CardBody className="gap-4 p-4 md:px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white" style={{backgroundColor: transaction.category.color}}>
                                    {transaction.category.icon ? <Icon icon={transaction.category.icon} /> : transaction.category.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-bold leading-5 text-foreground">{transaction.description || transaction.category.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-default-500">{transaction.category.name}</div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className={`text-xl font-bold md:text-2xl ${isIncome ? "text-success" : "text-danger"}`}>
                                    {isIncome ? "+" : "-"}
                                    {NumberUtil.formatCurrency(amount)}
                                </div>
                                <span className="text-small text-default-400">{moment(transaction.date).fromNow()}</span>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="flex justify-between border-t-1 border-t-default-200 bg-default-100/50 p-4 md:px-6">
                        <div className="flex w-full justify-between gap-4">
                            <div className="flex flex-col gap-1 text-left">
                                <div className="flex items-center gap-2">
                                    <Icon icon="mdi:calendar-clock" className="text-lg text-default-500" />
                                    <span className="font-mono text-small text-default-700">{moment(transaction.date).format("YYYY-MM-DD HH:mm")}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <Chip color={isIncome ? "success" : "danger"} variant="flat" size="sm" className="w-fit">
                                    {isIncome ? "收入" : "支出"}
                                </Chip>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key="edit" textValue="編輯" onPress={() => onEdit(transaction)}>
                    <div className="flex items-center gap-2">
                        <Icon icon="mdi:pencil" className="text-lg" />
                        編輯
                    </div>
                </DropdownItem>
                <DropdownItem key="delete" textValue="刪除" onPress={() => onDelete(transaction)}>
                    <div className="flex items-center gap-2 text-danger">
                        <Icon icon="mdi:trash-can" className="text-lg" />
                        刪除
                    </div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
