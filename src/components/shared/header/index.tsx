import { lazy } from "react";

const DesktopMenu = lazy(() => import("./DesktopMenu"));
const MobileMenu = lazy(() => import("./MobileMenu"));

export { DesktopMenu, MobileMenu };