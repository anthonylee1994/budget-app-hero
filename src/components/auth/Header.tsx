import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";

interface Props {
    title: string;
    description: string;
}

export const Header = ({title, description}: Props) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-between pb-5 pt-10">
            <div className="mb-4 flex cursor-pointer items-center gap-1" onClick={() => navigate("/")}>
                <Icon icon="fa-solid:wallet" className="mr-2 select-none text-3xl text-primary-500 md:text-4xl" />
                <span className="select-none bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-4xl">
                    BudgetHero
                </span>
            </div>
            <div className="mb-2 text-3xl text-default-900">{title}</div>
            <div className="text-lg text-default-500">{description}</div>
        </div>
    );
};
