import { PropsWithChildren, createElement, memo } from "react";

import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { Theme } from "../theme";

import "./normalize.css";

export const ThemeProvider = memo<ThemeProviderProps>(({ children, theme }) =>
  createElement(StyledComponentsThemeProvider, { theme }, children),
);

type ThemeProviderProps = PropsWithChildren<{
  theme: Theme;
}>;
