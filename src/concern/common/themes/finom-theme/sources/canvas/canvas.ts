import { createGlobalStyle } from "styled-components";

import { getUnitWithMeasure } from "~/infrastructure/ui";

import * as Fonts from "./fonts";

export const Canvas = createGlobalStyle`
  @font-face {
    font-family: 'Euclid Circular B';
    font-display: swap;
    src: url(${Fonts.EuclidCircularBRegular}) format("woff2");
    font-weight: 400;
    font-style: normal
  }

  @font-face {
    font-family: 'Euclid Circular B';
    font-display: swap;
    src: url(${Fonts.EuclidCircularBMedium}) format("woff2");
    font-weight: 500;
    font-style: normal
  }

  @font-face {
    font-family: 'Euclid Circular B';
    font-display: swap;
    src: url(${Fonts.EuclidCircularBSemibold}) format("woff2");
    font-weight: 600;
    font-style: normal
  }

  @font-face {
    font-family: 'Euclid Circular B';
    font-display: swap;
    src: url(${Fonts.EuclidCircularBRegularItalic}) format("woff2");
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Euclid Circular B';
    font-display: swap;
    src: url(${Fonts.EuclidCircularBMediumItalic}) format("woff2");
    font-weight: 500;
    font-style: italic
  }

  @font-face {
    font-family: 'Euclid Circular B';
    font-display: swap;
    src: url(${Fonts.EuclidCircularBSemiboldItalic}) format("woff2");
    font-weight: 600;
    font-style: italic
  }


  body {
    font-family: Euclid Circular B, system-ui, sans-serif;
    font-size: ${getUnitWithMeasure(4)};
    line-height: ${getUnitWithMeasure(4)};
    color: ${({ theme }) => theme.colors.default[1].filled()};
    background-color: ${({ theme }) => theme.colors.default[8].filled()};
  }
`;
