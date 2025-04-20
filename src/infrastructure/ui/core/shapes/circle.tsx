import { HTMLAttributes } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../utils";

export const CircleCSS = css<CircleStyledProps>`
  width: ${({ $diameter }) => getUnitWithMeasure($diameter)};
  height: ${({ $diameter }) => getUnitWithMeasure($diameter)};
  border-radius: 50%;
  overflow: hidden;
`;

export const Circle = styled.div<CircleStyledProps>`
  ${CircleCSS}
`;

Circle.displayName = "Circle";

export interface CircleProps extends HTMLAttributes<CircleElement> {
  diameter: number;
}

export type CircleStyledProps = TransientProps<Pick<CircleProps, "diameter">>;

export type CircleElement = HTMLDivElement;
