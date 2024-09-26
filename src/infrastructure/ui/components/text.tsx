import { HTMLAttributes, memo } from "react";

import { styled } from "styled-components";

import { GlyphProps } from "../core";
import { getUnitWithMeasure, TransientProps } from "../helpers";

export const Text = memo<TextProps>(({ size, color, ...props }) => (
  <TextStyled $size={size} $color={color} {...props} />
));

Text.displayName = "Text";

const TextStyled = styled.span<TransientProps<GlyphProps>>`
  font-size: ${({ $size }) => getUnitWithMeasure($size)};
  color: ${({ $color }) => $color};
`;

export interface TextProps
  extends HTMLAttributes<HTMLSpanElement>,
    GlyphProps {}
