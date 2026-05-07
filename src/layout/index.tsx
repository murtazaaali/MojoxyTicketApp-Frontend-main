import { lazy } from "react";

const AppLayout = lazy(() => import("./AppLayout"));
const MainLayout = lazy(() => import("./MainLayout"));
const AuthLayout = lazy(() => import("./AuthLayout"));
const DashboardLayout = lazy(() => import("./DashboardLayout"));
const EmptyLayout = lazy(() => import("./EmptyLayout"));

export { AppLayout, MainLayout, AuthLayout, DashboardLayout, EmptyLayout };