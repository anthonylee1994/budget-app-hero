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
                <Icon icon="fa-solid:wallet" className="mr-2 text-4xl text-blue-500" />
                <span className="text-4xl font-light text-blue-500">智慧理財</span>
            </div>
            <div className="mb-2 text-3xl text-black dark:text-white">{title}</div>
            <div className="text-lg text-gray-500">{description}</div>
        </div>
    );
};
