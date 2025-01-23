import { createGlobalStyle } from "styled-components";

import { getUnitWithMeasure } from "~/infrastructure/ui";

import "./fonts.css";

export const Canvas = createGlobalStyle`
  body {
    font-family: Euclid Circular B, system-ui, sans-serif;
    font-size: ${getUnitWithMeasure(1.6)};
    line-height: ${getUnitWithMeasure(2.4)};
    color: ${({ theme }) => theme.colors.default[1].filled()};
    background-color: ${({ theme }) => theme.colors.default[8].filled()};
  }

  p, ul, ol {
    margin-block-start: 1rem;
    margin-block-end: 1rem;
  }

  p:first-child, ul:first-child, ol:first-child {
    margin-block-start: 0;
  }

  p:last-child, ul:last-child, ol:last-child {
    margin-block-end: 0;
  }

  hr {
    border: none;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.default[7].filled()};
  }

  fieldset {
    border-width: 0;
    padding: 0;
    margin: 0 0 ${getUnitWithMeasure(1.4)} 0;
  }

  /* svg {
    display: flex;
    fill: currentColor;
  }

  svg path {
    fill: currentColor;
  } */
`;
