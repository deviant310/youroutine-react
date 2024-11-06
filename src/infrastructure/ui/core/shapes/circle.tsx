import { HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps, UnitIndex } from "../../helpers";

export const Circle = memo<CircleProps>(({ size, ...props }) => (
  <CircleStyled $size={size} {...props} />
));

export const CircleCSS = css<TransientProps<CircleStyledProps>>`
  width: ${({ $size }) => getUnitWithMeasure($size)};
  height: ${({ $size }) => getUnitWithMeasure($size)};
  border-radius: 50%;
  overflow: hidden;
`;

const CircleStyled = styled.div<TransientProps<CircleStyledProps>>`
  ${CircleCSS}
`;

Circle.displayName = "Circle";

export interface CircleStyledProps {
  size?: UnitIndex;
}

export interface CircleProps
  extends HTMLAttributes<CircleElement>,
    CircleStyledProps {}

export type CircleElement = HTMLDivElement;
