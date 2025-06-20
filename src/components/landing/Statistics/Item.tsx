interface Props {
    title: string;
    value: string;
}

export const Item: React.FC<Props> = ({title, value}) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h3 className="text-4xl font-bold text-primary-600">{value}</h3>
            <p className="mt-2 text-sm text-default-600">{title}</p>
        </div>
    );
};
