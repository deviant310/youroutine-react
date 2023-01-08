import { FunctionComponent, MouseEvent, PropsWithChildren } from 'react';

import styled from 'styled-components';

import { useRipple } from './ripple';

const StyledButton = styled.button<Button.Props>`
  padding: 15px;
  background-color: ${({ theme, variant }) => ({
    contained: theme.colors.accent.hex(),
    outlined: theme.colors.primary.hex()
  }[variant])};
  color: ${({ theme, variant }) => ({
    contained: theme.colors.primary.hex(),
    outlined: theme.colors.neutral.hex()
  }[variant])};
  font-weight: bold;
  letter-spacing: -.3px;
  text-transform: uppercase;
  border-style: ${({ variant }) => ({
    contained: 'none',
    outlined: 'solid'
  }[variant])};
  border-color: ${({ theme, variant }) => ({
    contained: 'initial',
    outlined: theme.colors.accent.lighten(.8).hex()
  }[variant])};
  border-width: 1px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  transition: background-color 200ms, box-shadow 200ms, border-color 200ms;
  box-shadow: ${({ theme, variant }) => ({
    contained: `0 3px 2px -2px ${theme.colors.neutral.alpha(.8)}`,
    outlined: 'none'
  }[variant])};

  &:hover {
    background-color: ${({ theme, variant }) => ({
    contained: theme.colors.accent.darken(.1).hex(),
    outlined: theme.colors.accent.lighten(1.15).hex()
  }[variant])};
    box-shadow: ${({ theme, variant }) => ({
    contained: `0 3px 5px -2px ${theme.colors.neutral.alpha(.8)}`,
    outlined: 'none'
  }[variant])};
    border-color: ${({ theme, variant }) => ({
    contained: 'initial',
    outlined: theme.colors.accent.hex()
  }[variant])};
  }

  &:active {
    box-shadow: ${({ theme, variant }) => ({
    contained: `0 5px 14px -3px ${theme.colors.neutral.alpha(.8)}`,
    outlined: 'none'
  }[variant])};
  }

  --ripple-background-color: ${({ theme, variant }) => ({
    contained: theme.colors.primary.alpha(.3).hexa(),
    outlined: theme.colors.accent.lighten(1).hex()
  }[variant])};
`;

const StyledChildrenContainer = styled.span`
  position: relative;
`;

export const Button: Button.Component = ({ children, ...props }) => {
  const { ripples, sourceRef } = useRipple<HTMLButtonElement>();

  return (
    <StyledButton {...props} ref={sourceRef}>
      {ripples}

      <StyledChildrenContainer>
        {children}
      </StyledChildrenContainer>
    </StyledButton>
  );
};

Button.displayName = 'Button';

export namespace Button {
  export type Component = FunctionComponent<PropsWithChildren<Props>>

  export interface Props {
    onClick(event: MouseEvent<HTMLButtonElement>): void;
    variant: 'contained' | 'outlined';
  }
}
