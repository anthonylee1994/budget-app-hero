import {Chip} from "@heroui/chip";
import {Item} from "./Item";

export const WhyUS = () => {
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-5xl p-5 py-10 text-center md:pb-20">
                <Chip color="primary" size="lg" className="my-4">
                    🚀 強大功能
                </Chip>
                <div className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">為什麼選擇我們？</div>
                <div className="text-md mb-8 text-gray-600 md:text-lg">我們提供全方位的財務管理解決方案，幫助您輕鬆掌控每一筆收支，實現財務目標。</div>
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-gray-900 sm:grid-cols-2 lg:grid-cols-3">
                    <Item icon="mdi:chart-bar" title="智能分析" description="透過視覺化圖表和深度分析，清楚了解您的消費習慣和理財趨勢。" />
                    <Item icon="mdi:wallet" title="多元分類" description="靈活的收支分類系統，讓您精確記錄每一筆交易的用途。" />
                    <Item icon="mdi:shield-alert" title="安全可靠" description="採用銀行級加密技術，確保您的財務資料安全無虞。" />
                    <Item icon="mdi:cellphone" title="跨平台同步" description="無論使用手機、平板或電腦，您的資料都能即時同步。" />
                    <Item icon="mdi:users" title="家庭共享" description="與家人共同管理家庭預算，一起實現財務目標。" />
                    <Item icon="mdi:rocket" title="目標設定" description="設定理財目標並追蹤進度，讓存錢變得更有動力。" />
                </div>
            </div>
        </div>
    );
};
