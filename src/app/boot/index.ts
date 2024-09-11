import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { registerProviders } from "~/infrastructure/context";
import { HttpProvider } from "~/infrastructure/http";

import { FinomThemeProvider } from "~/concern/common/themes";

import { Router } from "./router";

const root = document.getElementById("root") as HTMLElement;

const RootProvider = registerProviders(FinomThemeProvider, HttpProvider);

createRoot(root).render(createElement(RootProvider, {}, createElement(Router)));
