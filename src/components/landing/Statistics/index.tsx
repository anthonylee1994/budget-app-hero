import {Item} from "./Item";

export const Statistics = () => {
    return (
        <div className="bg-white p-8 dark:bg-gray-900 lg:p-16">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 text-gray-900 lg:grid-cols-4">
                <Item title="收入" value="10K+" />
                <Item title="交易紀錄" value="50M+" />
                <Item title="滿意度" value="95%" />
                <Item title="客服支援" value="24/7" />
            </div>
        </div>
    );
};
