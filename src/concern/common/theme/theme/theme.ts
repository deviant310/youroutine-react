import { createElement, memo } from "react";

import { PropsWithRequiredChildren } from "~/react";

import { ThemeProvider } from "~/infrastructure/ui";

import { Canvas, ThemeLight } from "./sources";

export const Theme = memo<PropsWithRequiredChildren>(props => {
  const { children } = props;

  return createElement(
    ThemeProvider,
    { theme: ThemeLight },
    createElement(Canvas),
    children,
  );
});
