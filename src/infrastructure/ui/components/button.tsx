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
    const { children, type = "primary", disabled, ...restProps } = props;

    return (
      <ButtonStyled $type={type} $disabled={disabled} {...restProps} ref={ref}>
        {children}
      </ButtonStyled>
    );
  }),
);

const ButtonStyled = styled(Clickable).attrs<TransientProps<ButtonStyledProps>>(
  ({ $disabled }) => ({
    role: "button",
    disabled: $disabled,
  }),
)`
  font-weight: 500;
  padding: ${getUnitWithMeasure(0.8)} ${getUnitWithMeasure(2.4)};
  border-radius: ${getUnitWithMeasure(1.2)};

  background-color: ${({ $type, theme }) => {
    if ($type === "primary") return theme.colors.tension[2].filled();
    if ($type === "primary-light") return theme.colors.tension[7].transparent();
  }};

  color: ${({ $type, theme }) => {
    if ($type === "primary") return theme.colors.default[9].filled();
    if ($type === "primary-light") return theme.colors.tension[2].filled();
    if ($type === "link") return theme.colors.tension[2].filled();
  }};

  opacity: ${({ $type, $disabled }) => {
    if ($disabled) {
      if ($type === "primary" || $type === "secondary") return "32%";

      return "50%";
    }
  }};

  &:hover {
    background-color: ${({ $type, theme }) => {
      if ($type === "primary") return theme.colors.tension[1].filled();
      if ($type === "primary-light")
        return theme.colors.tension[6].transparent();
    }};
  }

  --ripple-background-color: ${({ $type, theme }) => {
    if ($type === "primary") return theme.colors.tension[0].filled();
    if ($type === "primary-light") return theme.colors.tension[7].transparent();
  }};
`;

export type ButtonComponent = ForwardRefExoticComponent<
  ButtonProps & RefAttributes<ClickableElement>
>;

type ButtonType =
  | "primary"
  | "primary-light"
  | "secondary"
  | "secondary-light"
  | "link"
  | "contrast";

export interface ButtonStyledProps extends ClickableStyledProps {
  type?: ButtonType;
}

export interface ButtonProps extends ClickableProps, ButtonStyledProps {
  children: string;
}
