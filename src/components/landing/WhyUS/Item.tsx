interface Props {
    Icon: React.ElementType;
    title: string;
    description: string;
}

export const Item = ({Icon, title, description}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-1 border-gray-700 bg-gray-800 px-4 py-6 transition-all hover:-translate-y-1 hover:border-blue-400">
            <Icon className="mb-2 text-8xl text-blue-400 sm:text-4xl" />
            <div className="mb-2 text-xl">{title}</div>
            <div className="text-md text-gray-400">{description}</div>
        </div>
    );
};
