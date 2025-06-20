export const Footer = () => {
    return (
        <div className="bg-default-100 pb-[env(safe-area-inset-bottom)]">
            <div className="mx-auto max-w-5xl p-5 text-center text-default-600">© {new Date().getFullYear()} 智慧理財，版權所有。</div>
        </div>
    );
};
