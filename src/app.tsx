import {Route, Routes} from "react-router-dom";
import {IndexPage} from "./pages";
import {ProtectedRoute} from "./components/auth/ProtectedRoute";
import {DashboardPage} from "./pages/dashboard";
import {CategoriesPage} from "./pages/categories";
import {MainLayout} from "./components/common/MainLayout";
import {TransactionsPage} from "./pages/transactions";
import moment from "moment";
import "moment/dist/locale/zh-hk";
import {SettingsPage} from "./pages/settings";
import {AuthPage} from "./pages/auth";

moment.locale("zh-hk");

export const App = () => {
    return (
        <MainLayout>
            <Routes>
                <Route element={<IndexPage />} path="/" />
                <Route element={<AuthPage />} path="/register" />
                <Route element={<AuthPage />} path="/login" />
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
