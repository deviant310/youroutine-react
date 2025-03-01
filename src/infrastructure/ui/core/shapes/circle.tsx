import { HTMLAttributes } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, UnitIndex } from "../../helpers";

export const CircleCSS = css<CircleProps>`
  width: ${({ $size }) => getUnitWithMeasure($size)};
  height: ${({ $size }) => getUnitWithMeasure($size)};
  border-radius: 50%;
  overflow: hidden;
`;

export const Circle = styled.div<CircleProps>`
  ${CircleCSS}
`;

//Circle.displayName = "Circle";

export interface CircleProps {
  $size?: UnitIndex;
}

export interface CirclePropsWithHtmlAttributes
  extends HTMLAttributes<CircleElement>,
    CircleProps {}

export type CircleElement = HTMLDivElement;
