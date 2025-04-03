import { createElement } from "react";
import { createRoot } from "react-dom/client";

import { getRootElement } from "~/react";

import { combineProviders } from "~/infrastructure/context";
import { HttpProvider } from "~/infrastructure/http";

import { Theme } from "~/concern/common/theme";

import { App } from "./app";

const RootProvider = combineProviders(Theme, HttpProvider);

createRoot(getRootElement()).render(
  createElement(RootProvider, { children: createElement(App) }),
);
