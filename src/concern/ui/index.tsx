import Color from 'color';

import { DefaultTheme, ThemeProvider, createGlobalStyle } from 'styled-components';

import { normalize } from 'styled-normalize';

import React, { PropsWithChildren } from 'react';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accent: Color;
      neutral: Color;
      primary: Color;
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
    color: ${({ theme }) => theme.colors.neutral.hex()};
    background-color: ${({ theme }) => theme.colors.primary.darken(.03).hex()};
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
