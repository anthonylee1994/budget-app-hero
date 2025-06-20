interface Props {
    title: string;
    value: string;
}

export const Item: React.FC<Props> = ({title, value}) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">{value}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{title}</p>
        </div>
    );
};
