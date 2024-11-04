import { createGlobalStyle } from "styled-components";

import { getUnitWithMeasure } from "~/infrastructure/ui";

import "./fonts.css";

export const Canvas = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-family: Euclid Circular B, system-ui, sans-serif;
    font-size: ${getUnitWithMeasure(1.6)};
    line-height: ${getUnitWithMeasure(2.4)};
    color: ${({ theme }) => theme.colors.default[1].filled()};
    background-color: ${({ theme }) => theme.colors.default[8].filled()};
  }

  hr {
    border: none;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.default[7].filled()};
  }

  a:not([href]) {
    pointer-events: none;
  }

  fieldset {
    border-width: 0;
    padding: 0;
    margin: 0 0 ${getUnitWithMeasure(1.4)} 0;
  }

  svg {
    display: flex;
    fill: currentColor;
  }

  :focus-visible {
    outline: none;
  }
`;
