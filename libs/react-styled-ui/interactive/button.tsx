import { PropsWithChildren } from 'react';

import styled from 'styled-components';

import { useRipple } from './ripple';

const StyledButton = styled.button`
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.buttonContainedBackground};
  color: ${({ theme }) => theme.colors.textInverted};
  font-weight: bold;
  letter-spacing: -.3px;
  text-transform: uppercase;
  border-style: none;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  transition: background-color 200ms, box-shadow 200ms;
  box-shadow: 0 3px 2px -2px ${({ theme }) => theme.colors.buttonContainedShadow};

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonContainedHoveredBackground};
    box-shadow: 0 3px 5px -2px ${({ theme }) => theme.colors.buttonContainedShadow};
  }

  &:active {
    box-shadow: 0 5px 14px -3px ${({ theme }) => theme.colors.buttonContainedShadow};
  }

  --ripple-background-color: ${({ theme }) => theme.colors.buttonContainedActiveRippleBackground};
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

export namespace Button {
  export interface Component {
    <P> (props: PropsWithChildren<P>): JSX.Element;
  }
}
