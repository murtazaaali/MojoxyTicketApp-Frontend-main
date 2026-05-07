import { lazy } from "react";

const TicketVerifyEmptyState = lazy(() => import("./EmptyState"));
const VerifySuccess = lazy(() => import("./VerifySuccess"));

export { TicketVerifyEmptyState, VerifySuccess };
