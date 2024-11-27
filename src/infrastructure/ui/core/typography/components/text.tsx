import { ElementRef, HTMLAttributes, memo } from "react";

import { css, styled } from "styled-components";

import { getUnitWithMeasure, TransientProps } from "../../../helpers";

export const Text = memo<TextPropsWithHTMLAttributes>(
  ({ type, size, weight, nowrap, ...props }) => (
    <TextStyled
      $type={type}
      $size={size}
      $weight={weight}
      $nowrap={nowrap}
      {...props}
    />
  ),
);

Text.displayName = "Text";

export const TextCSS = css<TransientProps<TextStyledProps>>`
  white-space: ${({ $nowrap }) => $nowrap && "nowrap"};

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

  color: ${({ theme, $type }) => {
    if ($type === "default") return theme.colors.default[1].filled();
    if ($type === "light") return theme.colors.default[2].filled();
    if ($type === "xlight") return theme.colors.default[3].filled();
    if ($type === "action") return theme.colors.primary[2].filled();
  }};
`;

const TextStyled = styled.span<TransientProps<TextStyledProps>>`
  ${TextCSS}
`;

export type TextType = "default" | "light" | "xlight" | "action";

export interface TextStyledProps {
  type?: TextType;
  size?: "large" | "medium" | "small" | "xsmall";
  weight?: TextWeight;
  nowrap?: boolean;
}

export interface TextProps extends TextStyledProps {
  children: string;
}

export interface TextPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<TextElement>, "children">,
    TextProps {}

export type TextWeight = "regular" | "medium" | "semibold";

export type TextElement = ElementRef<typeof TextStyled>;
