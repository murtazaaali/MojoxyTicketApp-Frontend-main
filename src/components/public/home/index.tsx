import { lazy } from "react";

const HeroSlide = lazy(() => import("./HeroSlide"));
const Slider = lazy(() => import("./Slider"));
const SearchBar = lazy(() => import("./SearchBar"));
const QuickStats = lazy(() => import("./QuickStats"));
const Categories = lazy(() => import("./Categories"));
const FeaturedEvents = lazy(() => import("./FeaturedEvents"));
const CTASection = lazy(() => import("./CTASection"));

export { HeroSlide, Slider, SearchBar, QuickStats, Categories, FeaturedEvents, CTASection };