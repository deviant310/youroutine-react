import { ElementRef, HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../../helpers";

export const Text = memo<TextPropsWithHTMLAttributes>(
  ({ size, weight, color, ...props }) => (
    <TextStyled $size={size} $color={color} $weight={weight} {...props} />
  ),
);

Text.displayName = "Text";

export const TextCSS = css<TransientProps<TextStyledProps>>`
  line-height: ${({ $size }) => {
    if ($size === "large") return getUnitWithMeasure(2.6);
    if ($size === "medium") return getUnitWithMeasure(2.4);
    if ($size === "small") return getUnitWithMeasure(2);
    if ($size === "xsmall") return getUnitWithMeasure(1.6);
  }};

  font-size: ${({ $size }) => {
    if ($size === "large") return getUnitWithMeasure(1.8);
    if ($size === "medium") return getUnitWithMeasure(1.6);
    if ($size === "small") return getUnitWithMeasure(1.4);
    if ($size === "xsmall") return getUnitWithMeasure(1.2);
  }};

  font-weight: ${({ $weight }) => {
    if ($weight === "regular") return 400;
    if ($weight === "medium") return 500;
    if ($weight === "semibold") return 600;
  }};

  color: ${({ $color }) => $color};
`;

const TextStyled = styled.span<TransientProps<TextStyledProps>>`
  ${TextCSS}
`;

export interface TextStyledProps {
  size?: "large" | "medium" | "small" | "xsmall";
  weight?: TextWeight;
  color?: string;
}

export interface TextProps extends TextStyledProps {
  children: string;
}

export interface TextPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<TextElement>, "children">,
    TextProps {}

export type TextWeight = "regular" | "medium" | "semibold";

export type TextElement = ElementRef<typeof TextStyled>;
