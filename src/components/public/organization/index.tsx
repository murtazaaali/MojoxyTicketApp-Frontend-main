import { lazy } from "react";

const OrgEventSection = lazy(() => import("./OrgEventSection"));
const OrgHeroSection = lazy(() => import("./OrgHeroSection"));
const OrgNotFound = lazy(() => import("./OrgNotFound"));
const OrgStatCard = lazy(() => import("./OrgStatCard"));

export { OrgEventSection, OrgHeroSection, OrgNotFound, OrgStatCard };