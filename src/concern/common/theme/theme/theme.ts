import { createElement, memo, PropsWithChildren } from "react";

import { ThemeProvider } from "~/infrastructure/ui";

import { Canvas, ThemeLight } from "./sources";

export const Theme = memo<Required<PropsWithChildren>>(props => {
  const { children } = props;

  return createElement(
    ThemeProvider,
    { theme: ThemeLight },
    createElement(Canvas),
    children,
  );
});
