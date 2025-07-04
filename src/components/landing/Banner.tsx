import {Button} from "@heroui/button";
import {Chip} from "@heroui/chip";
import {Icon} from "@iconify/react";
import {Link} from "react-router-dom";

export const Banner = () => {
    return (
        <div className="relative mt-[calc(65px+env(safe-area-inset-top))] overflow-hidden bg-primary-100 py-5 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-center p-4 md:justify-between md:p-0 lg:flex-row">
                <div className="flex flex-col items-center p-2 text-center md:p-10 lg:max-w-[550px] lg:items-start lg:text-left">
                    <Chip size="lg" color="primary" className="mb-4">
                        💰 智能預算管理
                    </Chip>
                    <div className="text-4xl font-bold text-default-900 md:text-5xl">
                        <div className="mb-2">掌控您的財務未來</div>
                        <div className="mb-2 text-primary-600">輕鬆管理每一筆收支</div>
                    </div>
                    <div className="mb-8 mt-4 text-lg text-default-600">使用我們的預算應用程式，讓您輕鬆追蹤收入與支出，制定明智的財務決策，實現財務自由。</div>
                    <div className="flex gap-4">
                        <Button as={Link} to="/register" color="primary" size="lg">
                            免費註冊
                        </Button>
                        <Button as={Link} to="/login" variant="bordered" size="lg" className="border-primary-500 text-primary-500">
                            立即登入
                        </Button>
                    </div>
                </div>
                <div className="p-10">
                    <div className="flex h-[300px] w-[300px] items-center justify-center rounded-full border-2 border-primary-500 bg-default-50 shadow-lg">
                        <Icon icon="fa6-solid:money-bill-trend-up" className="text-[100px] text-primary-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};
