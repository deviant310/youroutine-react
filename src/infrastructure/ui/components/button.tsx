import {
  memo,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

import { styled } from "styled-components";

import {
  Clickable,
  ClickableElement,
  ClickableProps,
  ClickableStyledProps,
} from "../core";
import { getUnitWithMeasure, TransientProps } from "../helpers";

export const Button: ButtonComponent = memo(
  forwardRef((props, ref) => {
    const {
      children,
      variant = "text",
      color = "primary",
      disabled,
      ...restProps
    } = props;

    return (
      <ButtonStyled
        $color={color}
        $variant={variant}
        $disabled={disabled}
        {...restProps}
        ref={ref}
      >
        {children}
      </ButtonStyled>
    );
  }),
);

const ButtonStyled = styled(Clickable).attrs({ role: "button" })<
  TransientProps<ButtonStyledProps>
>`
  padding: ${getUnitWithMeasure(3)} ${getUnitWithMeasure(6)};
  font-weight: 500;
  border-radius: ${getUnitWithMeasure(3)};

  background-color: ${({ $variant, $color, theme }) => {
    if ($variant === "contained") {
      if ($color === "primary") return theme.colors.tension[2].filled();

      if ($color === "primary-light")
        return theme.colors.tension[7].transparent();
    }
  }};

  color: ${({ $variant, $color, theme }) => {
    if ($variant === "text") {
      if ($color === "primary-light") return theme.colors.tension[2].filled();
    }

    if ($variant === "contained") {
      if ($color === "primary") return theme.colors.default[9].filled();
      if ($color === "primary-light") return theme.colors.tension[2].filled();
    }
  }};

  fill: ${({ $variant, $color, theme }) => {
    if ($variant === "text") {
      if ($color === "primary-light") return theme.colors.tension[2].filled();
    }

    if ($variant === "contained") {
      if ($color === "primary") return theme.colors.default[9].filled();
      if ($color === "primary-light") return theme.colors.tension[2].filled();
    }
  }};

  opacity: ${({ $color, $disabled }) => {
    if ($disabled) {
      if ($color === "primary" || $color === "secondary") return "32%";

      return "50%";
    }
  }};

  &:hover {
    background-color: ${({ $variant, $color, theme }) => {
      if ($variant === "contained") {
        if ($color === "primary") return theme.colors.tension[1].filled();
        if ($color === "primary-light")
          return theme.colors.tension[6].transparent();
      }
    }};
  }

  --ripple-background-color: ${({ $variant, $color, theme }) => {
    if ($variant === "contained") {
      if ($color === "primary") return theme.colors.tension[0].filled();
      if ($color === "primary-light")
        return theme.colors.tension[7].transparent();
    }
  }};
`;

export type ButtonComponent = ForwardRefExoticComponent<
  ButtonProps & RefAttributes<ClickableElement>
>;

type ButtonVariant = "text" | "contained";

type ButtonColor =
  | "primary"
  | "primary-light"
  | "secondary"
  | "secondary-light"
  | "contrast";

export interface ButtonStyledProps extends ClickableStyledProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
}

export interface ButtonProps
  extends Omit<ClickableProps, "color">,
    ButtonStyledProps {}
