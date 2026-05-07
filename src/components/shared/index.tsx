import { lazy } from "react";

import SuspenseComp from "./SuspenseComp";
const LoaderComp = lazy(() => import('./LoadingComp'))
const Header = lazy(() => import('./Header'))
const Footer = lazy(() => import('./Footer'))
const Sidebar = lazy(() => import('./Sidebar'))
const PageHeader = lazy(() => import('./PageHeader'))
const GoToBackLink = lazy(() => import('./GoToBackLink'))
const DownloadTicket = lazy(() => import('./DownloadTicket'))

export { SuspenseComp, LoaderComp, Header, Footer, Sidebar, PageHeader, GoToBackLink, DownloadTicket }