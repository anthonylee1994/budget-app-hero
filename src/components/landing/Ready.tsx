import {Button} from "@heroui/button";
import {Link} from "react-router-dom";

export const Ready = () => {
    return (
        <div className="bg-primary-100 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
            <div className="mx-auto max-w-5xl px-8 py-10 text-center md:p-20">
                <div className="mb-4 text-2xl font-bold text-default-900 md:text-4xl">準備開始您的理財之旅嗎？</div>
                <div className="mb-8 text-lg text-default-600">加入我們，讓理財成為您生活的一部分。</div>
                <div className="flex justify-center gap-4">
                    <Button as={Link} to="/register" size="lg" className="bg-primary-500 text-white">
                        免費註冊
                    </Button>
                    <Button as={Link} to="/login" variant="bordered" size="lg" className="border-primary-500 text-primary-500">
                        立即登入
                    </Button>
                </div>
            </div>
        </div>
    );
};
