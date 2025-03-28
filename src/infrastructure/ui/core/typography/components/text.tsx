import { HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../../helpers";
import { GlyphCSS, GlyphSize, GlyphProps } from "../helpers";

export const Text = memo<TextProps>(
  ({ color, size, weight, nowrap, ...props }) => (
    <TextStyled
      $color={color}
      $size={size}
      $weight={weight}
      $nowrap={nowrap}
      {...props}
    />
  ),
);

Text.displayName = "Text";

export const TextCSS = css<TextStyledProps>`
  ${GlyphCSS};

  white-space: ${({ $nowrap }) => $nowrap && "nowrap"};

  line-height: ${({ $size }) => {
    if ($size === "tiny") return getUnitWithMeasure(1.2);
    if ($size === "small") return getUnitWithMeasure(1.6);
    if ($size === "compact") return getUnitWithMeasure(2);
    if ($size === "normal") return getUnitWithMeasure(2.4);
    if ($size === "medium") return getUnitWithMeasure(2.6);
    if ($size === "large") return getUnitWithMeasure(2.8);
    if ($size === "big") return getUnitWithMeasure(3.2);
    if ($size === "huge") return getUnitWithMeasure(3.6);
    if ($size === "massive") return getUnitWithMeasure(4);
    if ($size === "colossal") return getUnitWithMeasure(4.8);
  }};

  font-size: ${({ $size }) => {
    if ($size === "tiny") return getUnitWithMeasure(1);
    if ($size === "small") return getUnitWithMeasure(1.2);
    if ($size === "compact") return getUnitWithMeasure(1.4);
    if ($size === "normal") return getUnitWithMeasure(1.6);
    if ($size === "medium") return getUnitWithMeasure(1.8);
    if ($size === "large") return getUnitWithMeasure(2);
    if ($size === "big") return getUnitWithMeasure(2.4);
    if ($size === "huge") return getUnitWithMeasure(2.8);
    if ($size === "massive") return getUnitWithMeasure(3.6);
    if ($size === "colossal") return getUnitWithMeasure(4.4);
  }};

  font-weight: ${({ $weight }) => {
    if ($weight === "regular") return 400;
    if ($weight === "medium") return 500;
    if ($weight === "semibold") return 600;
  }};
`;

const TextStyled = styled.span<TextStyledProps>`
  ${TextCSS}
`;

export interface TextProps
  extends Omit<HTMLAttributes<TextElement>, "color">,
    GlyphProps {
  size?: GlyphSize;
  weight?: TextWeight;
  nowrap?: boolean;
}

type TextStyledProps = TransientProps<
  GlyphProps & Pick<TextProps, "size" | "weight" | "nowrap">
>;

export interface TextPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<TextElement>, "color">,
    TextProps {}

export type TextWeight = "regular" | "medium" | "semibold";

export type TextElement = HTMLSpanElement;
