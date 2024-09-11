import { PropsWithChildren, createElement, memo } from "react";

import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { Theme } from "../theme";

import { GlobalStyle } from "./global-style";

export const ThemeProvider = memo<ThemeProviderProps>(props => {
  const { children, theme } = props;

  return createElement(
    StyledComponentsThemeProvider,
    { theme },
    createElement(GlobalStyle),
    children,
  );
});

type ThemeProviderProps = PropsWithChildren<{
  theme: Theme;
}>;
