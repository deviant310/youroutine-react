import { createElement, memo, ReactNode } from "react";

import { ThemeProvider } from "~/infrastructure/ui";

import { Canvas, ThemeLight } from "./sources";

export const Theme = memo<{ children: ReactNode }>(props => {
  const { children } = props;

  return createElement(
    ThemeProvider,
    { theme: ThemeLight },
    createElement(Canvas),
    children,
  );
});
