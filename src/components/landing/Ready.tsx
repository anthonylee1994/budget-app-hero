import {Button} from "@heroui/button";

export const Ready = () => {
    return (
        <div className="bg-blue-500">
            <div className="mx-auto max-w-5xl px-8 py-10 text-center md:p-20">
                <div className="mb-4 text-2xl font-bold text-white md:text-4xl">準備開始您的理財之旅嗎？</div>
                <div className="mb-8 text-lg text-white/80">加入我們，讓智慧理財成為您生活的一部分。</div>
                <div className="flex justify-center gap-4">
                    <Button size="lg" className="bg-white text-blue-500">
                        免費註冊
                    </Button>
                    <Button variant="bordered" size="lg" className="border-white">
                        立即登入
                    </Button>
                </div>
            </div>
        </div>
    );
};
