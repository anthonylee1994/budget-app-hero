import {Navigate, createBrowserRouter, RouterProvider} from "react-router-dom";
import {IndexPage} from "./pages";
import {DashboardPage} from "./pages/dashboard";
import {CategoriesPage} from "./pages/categories";
import {TransactionsPage} from "./pages/transactions";
import moment from "moment";
import "moment/dist/locale/zh-hk";
import {SettingsPage} from "./pages/settings";
import {AuthPage} from "./pages/auth";
import {ProtectedLayout} from "./components/common/ProtectedLayout";
import {AuthLayout} from "./components/common/AuthLayout";

moment.locale("zh-hk");

const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <AuthPage />,
            },
            {
                path: "register",
                element: <AuthPage />,
            },
        ],
    },
    {
        path: "/",
        element: <ProtectedLayout />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "categories",
                element: <CategoriesPage />,
            },
            {
                path: "transactions",
                element: <TransactionsPage />,
            },
            {
                path: "settings",
                element: <SettingsPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

export const App = () => {
    return <RouterProvider router={router} />;
};
