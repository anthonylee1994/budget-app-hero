export const Footer = () => {
    return (
        <div className="bg-default-100 pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
            <div className="mx-auto max-w-5xl p-5 text-center text-default-600">© {new Date().getFullYear()} BudgetHero, All rights reserved.</div>
        </div>
    );
};
