import { lazy } from "react";

const Brand = lazy(() => import("./Brand"))
const Copyright = lazy(() => import("./Copyright"));
const FooterLink = lazy(() => import("./FooterLink"))

export { Brand, Copyright, FooterLink };
