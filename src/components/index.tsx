import { lazy } from "react";

const ToastProvider = lazy(() => import("./ToastProvider"));

export { ToastProvider };