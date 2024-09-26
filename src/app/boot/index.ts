import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { getRootElement } from "~/rack/react";

import { registerProviders } from "~/infrastructure/context";
import { HttpProvider } from "~/infrastructure/http";

import { FinomThemeProvider } from "~/concern/common/themes";

import { Router } from "./router";

const RootProvider = registerProviders(FinomThemeProvider, HttpProvider);

createRoot(getRootElement()).render(
  createElement(RootProvider, { children: createElement(Router) }),
);
