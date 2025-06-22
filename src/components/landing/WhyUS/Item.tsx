import {Icon} from "@iconify/react";
import {motion, useMotionValue, useSpring, useTransform} from "framer-motion";
import {useRef} from "react";
import {useMediaQuery} from "usehooks-ts";

interface Props {
    icon: string;
    title: string;
    description: string;
}

export const Item = ({icon, title, description}: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, {stiffness: 500, damping: 28});
    const mouseYSpring = useSpring(y, {stiffness: 500, damping: 28});

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || !isDesktop) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        if (!isDesktop) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={
                isDesktop
                    ? {
                          rotateY: rotateY,
                          rotateX: rotateX,
                          transformStyle: "preserve-3d",
                      }
                    : {}
            }
            whileHover={isDesktop ? {z: 50} : {scale: 1.02}}
            className="group relative flex flex-col items-center justify-center rounded-2xl border-1 border-default-200 bg-default-50 px-4 py-6 shadow-sm duration-200 hover:-translate-y-1 hover:border-primary-400 hover:shadow-xl md:duration-0"
        >
            <div>
                <Icon icon={icon} className="mb-2 text-6xl text-primary-600 transition-colors duration-200 group-hover:text-primary-500 sm:text-4xl" />
            </div>
            <div className="mb-2 text-xl font-semibold text-default-900 transition-colors duration-200 group-hover:text-primary-700">{title}</div>
            <div className="text-md text-center text-default-500 transition-colors duration-200 group-hover:text-default-600">{description}</div>

            {/* Subtle background glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-100/20 to-secondary-100/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </motion.div>
    );
};
