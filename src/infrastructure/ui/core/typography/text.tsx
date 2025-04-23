import { HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import {
  ColoredCSS,
  ColoredProps,
  getUnitWithMeasureBySize,
  SizedProps,
} from "../../css";
import { getUnitWithMeasure, TransientProps } from "../../utils";

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
  color: ${ColoredCSS};
  font-size: ${({ $size }) => getUnitWithMeasureBySize($size)};
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
    ColoredProps,
    SizedProps {
  weight?: TextWeight;
  align?: TextAlign;
  nowrap?: boolean;
}

export type TextStyledProps = TransientProps<
  Pick<TextProps, "size" | "weight" | "nowrap" | "color">
>;

export interface TextPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<TextElement>, "color">,
    TextProps {}

export type TextWeight = "regular" | "medium" | "semibold";
export type TextAlign = "left" | "right" | "center";

export type TextElement = HTMLSpanElement;
