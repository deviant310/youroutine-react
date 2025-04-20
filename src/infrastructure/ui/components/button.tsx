import { memo } from "react";

import { styled } from "styled-components";

import {
  Clickable,
  ClickableElement,
  ClickableProps,
  Flex,
  Hidden,
  Loader,
} from "../core";
import { getUnitWithMeasure, TransientProps } from "../utils";

export const Button = memo<ButtonProps>(
  ({
    color = "primary",
    variant = "contained",
    loading,
    children,
    ...props
  }) => (
    <ButtonStyled $color={color} $variant={variant} {...props}>
      <Flex justifyContent="center" alignItems="center">
        {loading && <AbsoluteLoader size={2} />}

        <Hidden on={loading}>{children}</Hidden>
      </Flex>
    </ButtonStyled>
  ),
);

const ButtonStyled = styled(Clickable).attrs(({ rippleable = true }) => ({
  role: "button",
  rippleable,
}))<ButtonStyledProps>`
  font-weight: 500;
  padding: ${getUnitWithMeasure(0.8)} ${getUnitWithMeasure(2.4)};
  border-radius: ${getUnitWithMeasure(1.2)};

  background-color: ${({ $color, $variant, theme }) => {
    if ($variant === "contained") {
      if ($color === "primary") return theme.colors.primary[2].filled();
      if ($color === "primary-light")
        return theme.colors.primary[7].transparent();
    }
  }};

  color: ${({ $color, $variant, theme }) => {
    if ($variant === "contained") {
      if ($color === "primary") return theme.colors.main;
      if ($color === "primary-light") return theme.colors.primary[2].filled();
    }

    if ($variant === "link") return theme.colors.primary[2].filled();
  }};

  opacity: ${({ $color, disabled }) => {
    if (disabled) {
      if ($color === "primary") return "32%";

      return "50%";
    }
  }};

  &:hover,
  &:active {
    background-color: ${({ $color, $variant, theme }) => {
      if ($variant === "contained") {
        if ($color === "primary") return theme.colors.primary[1].filled();
        if ($color === "primary-light")
          return theme.colors.primary[6].transparent();
      }

      if ($variant === "link") return theme.colors.primary[6].transparent();
    }};
  }

  --ripple-background-color: ${({ $color, $variant, theme }) => {
    if ($variant === "contained") {
      if ($color === "primary") return theme.colors.primary[0].filled();
      if ($color === "primary-light")
        return theme.colors.primary[7].transparent();
    }

    if ($variant === "link") return theme.colors.primary[7].transparent();
  }};
`;

const AbsoluteLoader = styled(Loader)`
  position: absolute;
`;

type ButtonVariant = "contained" | "link";
type ButtonColor = "primary" | "primary-light";

export interface ButtonProps extends Omit<ClickableProps, "rippleable"> {
  loading?: boolean;
  children: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
}

export type ButtonStyledProps = TransientProps<
  Pick<ButtonProps, "color" | "variant">
>;

export type ButtonElement = ClickableElement;
