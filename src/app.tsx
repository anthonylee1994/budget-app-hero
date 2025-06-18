import {Route, Routes} from "react-router-dom";
import {IndexPage} from "./pages";
import {RegisterPage} from "./pages/register";
import {LoginPage} from "./pages/login";
import {ProtectedRoute} from "./components/auth/ProtectedRoute";
import {DashboardPage} from "./pages/dashboard";
import {CategoriesPage} from "./pages/categories";
import {MainLayout} from "./components/common/MainLayout";
import {TransactionsPage} from "./pages/transactions";
import moment from "moment";
import "moment/dist/locale/zh-hk";
import {SettingsPage} from "./pages/settings";

moment.locale("zh-hk");

export const App = () => {
    return (
        <MainLayout>
            <Routes>
                <Route element={<IndexPage />} path="/" />
                <Route element={<RegisterPage />} path="/register" />
                <Route element={<LoginPage />} path="/login" />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <ProtectedRoute>
                            <CategoriesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/transactions"
                    element={
                        <ProtectedRoute>
                            <TransactionsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </MainLayout>
    );
};
