import { memo, HTMLAttributes, ElementRef } from "react";

import { styled } from "styled-components";

import {
  Clickable,
  ClickableProps,
  ClickableStyledProps,
  Flex,
  Hidden,
  Loader,
} from "../core";
import { getUnitWithMeasure, TransientProps } from "../helpers";

export const Button = memo<ButtonPropsWithHTMLAttributes>(
  ({ type = "primary", loading, disabled, children, ...props }) => (
    <ButtonStyled $type={type} $disabled={disabled} {...props}>
      <Flex justifyContent="center" alignItems="center">
        {loading && <AbsoluteLoader size={2} />}

        <Hidden on={loading}>{children}</Hidden>
      </Flex>
    </ButtonStyled>
  ),
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
    if ($type === "primary") return theme.colors.primary[2].filled();
    if ($type === "primary-light") return theme.colors.primary[7].transparent();
  }};

  color: ${({ $type, theme }) => {
    if ($type === "primary") return theme.colors.default[9].filled();
    if ($type === "primary-light") return theme.colors.primary[2].filled();
    if ($type === "link") return theme.colors.primary[2].filled();
  }};

  opacity: ${({ $type, $disabled }) => {
    if ($disabled) {
      if ($type === "primary" || $type === "secondary") return "32%";

      return "50%";
    }
  }};

  &:hover {
    background-color: ${({ $type, theme }) => {
      if ($type === "primary") return theme.colors.primary[1].filled();
      if ($type === "primary-light")
        return theme.colors.primary[6].transparent();
    }};
  }

  --ripple-background-color: ${({ $type, theme }) => {
    if ($type === "primary") return theme.colors.primary[0].filled();
    if ($type === "primary-light") return theme.colors.primary[7].transparent();
  }};
`;

const AbsoluteLoader = styled(Loader)`
  position: absolute;
`;

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
  loading?: boolean;
  children: string;
}

export type ButtonElement = ElementRef<typeof ButtonStyled>;

interface ButtonPropsWithHTMLAttributes
  extends Omit<HTMLAttributes<ButtonElement>, "children">,
    ButtonProps {}
