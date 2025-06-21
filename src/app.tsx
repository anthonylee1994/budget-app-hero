import {Navigate, Route, Routes} from "react-router-dom";
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

export const App = () => {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />

            <Route element={<AuthLayout />}>
                <Route element={<AuthPage />} path="/register" />
                <Route element={<AuthPage />} path="/login" />
            </Route>

            <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};
