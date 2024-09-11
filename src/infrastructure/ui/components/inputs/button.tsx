import {
  ButtonHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
  memo,
} from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../helpers";

import { useRipple } from "./hooks";

export const Button: ButtonComponent = memo(
  ({ children, variant, ...props }) => {
    const { ref, ripples } = useRipple<HTMLButtonElement>();
    // TODO use clickable here
    return (
      <StyledButton $variant={variant} ref={ref} {...props}>
        {ripples}
        <StyledChildrenContainer>{children}</StyledChildrenContainer>
      </StyledButton>
    );
  },
);

const StyledButton = styled.button<TransientProps<ButtonCustomProps>>`
  padding: 19px;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  user-select: none;
  font-weight: bold;
  letter-spacing: -0.3px;
  text-transform: uppercase;
  border-width: 1px;
  border-radius: 0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  transition:
    background-color 200ms,
    box-shadow 200ms,
    border-color 200ms;

  background-color: ${({ $variant, disabled, theme }) =>
    ({
      contained: theme.colors.tension.hex(),
      disabled: theme.colors.default[1].filled(),
      outlined: theme.colors.primary.hex(),
    })[disabled ? "disabled" : $variant]};

  color: ${({ $variant, disabled, theme }) =>
    ({
      contained: theme.colors.primary.hex(),
      disabled: theme.colors.default[1].filled(),
      outlined: theme.colors.default[1].filled(),
    })[disabled ? "disabled" : $variant]};

  border-style: ${({ $variant }) =>
    ({
      contained: "none",
      outlined: "solid",
    })[$variant]};

  border-color: ${({ $variant, theme }) =>
    ({
      contained: "initial",
      outlined: theme.colors.tension.hex(),
    })[$variant]};

  box-shadow: ${({ $variant, disabled, theme }) =>
    ({
      contained: `0 3px 2px -2px ${theme.colors.default[1].filled()}`,
      disabled: "none",
      outlined: "none",
    })[disabled ? "disabled" : $variant]};

  &:hover {
    background-color: ${({ $variant, theme }) =>
      ({
        contained: theme.colors.tension.hex(),
        outlined: theme.colors.tension.hex(),
      })[$variant]};

    box-shadow: ${({ $variant, theme }) =>
      ({
        contained: `0 3px 5px -2px ${theme.colors.default[1].filled()}`,
        outlined: "none",
      })[$variant]};

    border-color: ${({ $variant, theme }) =>
      ({
        contained: "initial",
        outlined: theme.colors.tension.hex(),
      })[$variant]};
  }

  &:active {
    box-shadow: ${({ $variant, theme }) =>
      ({
        contained: `0 5px 14px -3px ${theme.colors.default[1].filled()}`,
        outlined: "none",
      })[$variant]};
  }

  --ripple-background-color: ${({ $variant, theme }) =>
    ({
      contained: theme.colors.primary.alpha(0.3).hexa(),
      outlined: theme.colors.tension.hex(),
    })[$variant]};
`;

const StyledChildrenContainer = styled.span`
  position: relative;
`;

export type ButtonComponent = FunctionComponent<PropsWithChildren<Props>>;

export type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonCustomProps {
  variant: "contained" | "outlined";
}

export type Props = ButtonBaseProps & ButtonCustomProps;
