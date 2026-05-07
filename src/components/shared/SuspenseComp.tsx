import React from "react";
import { LoaderComp } from "./index";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const SuspenseComp: React.FC<Props> = ({ children, fallback }) => {
    return <React.Suspense fallback={fallback || <LoaderComp />}>{children}</React.Suspense>;
};

export default SuspenseComp;
