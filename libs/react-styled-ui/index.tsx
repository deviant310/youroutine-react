import { DefaultTheme, ThemeProvider, createGlobalStyle } from 'styled-components';

import { normalize } from 'styled-normalize';

import React, { PropsWithChildren } from 'react';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bodyBackground: string;
      buttonContainedActiveRippleBackground: string;
      buttonContainedBackground: string;
      buttonContainedHoveredBackground: string;
      buttonContainedShadow: string;
      clickableActiveRippleBackground: string;
      clickableBackground: string;
      clickableHoveredBackground: string;
      icon: string;
      inputFilledBackground: string;
      inputFilledBorder: string;
      inputFilledFocusedBackground: string;
      inputFilledFocusedBorder: string;
      inputStandardBorder: string;
      inputStandardFocusedBorder: string;
      logoBackground: string;
      surfaceBackground: string;
      surfaceShadow: string;
      text: string;
      textInverted: string;
      textMuted: string;
    };
  }
}

type UIProps = {
  theme: DefaultTheme;
};

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    box-sizing: border-box;
    color: inherit;
    background-color: transparent;
  }

  body {
    font-family: system-ui, sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.bodyBackground};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  h2 {
    font-size: 1.57em;
  }

  fieldset {
    border-width: 0;
    padding: 0;
    margin: 0;
  }
`;

export default function UI ({ children, theme }: PropsWithChildren<UIProps>) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      {children}
    </ThemeProvider>
  );
}
