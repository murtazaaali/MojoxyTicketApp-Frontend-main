import { lazy } from "react";

const Label = lazy(() => import("./Label"));
const Button = lazy(() => import("./Button"));
const Input = lazy(() => import("./Input"));
const ReactFormInput = lazy(() => import("./ReactFormInput"));
const ReactFormTextArea = lazy(() => import("./ReactFormTextArea"));
const ImageUpload = lazy(() => import("./ImageUpload"));
const Select = lazy(() => import("./Select"));
const PasswordField = lazy(() => import("./PasswordField"));
const RadioGroup = lazy(() => import("./RadioGroup"));
const Switch = lazy(() => import("./Switch"));
const SearchSelect = lazy(() => import("./SearchSelect"));
const Card = lazy(() => import("./Card"));
const Badge = lazy(() => import("./Badge"));


export {
    Label, Button, Input, ReactFormInput, ReactFormTextArea, ImageUpload, Select,
    PasswordField, RadioGroup, Switch, Card, Badge, SearchSelect
};