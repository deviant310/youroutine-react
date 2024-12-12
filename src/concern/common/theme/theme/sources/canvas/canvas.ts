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
`;
