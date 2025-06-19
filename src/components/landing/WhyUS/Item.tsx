import { Icon } from "@iconify/react";

interface Props {
    icon: string
    title: string;
    description: string;
}

export const Item = ({icon, title, description}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-1 border-gray-200 bg-white px-4 py-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-400 hover:shadow-md">
            <Icon icon={icon} className="mb-2 text-8xl text-blue-600 sm:text-4xl" />
            <div className="mb-2 text-xl">{title}</div>
            <div className="text-md text-gray-600">{description}</div>
        </div>
    );
};
