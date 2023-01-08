import { FunctionComponent, MouseEvent, PropsWithChildren } from 'react';

import styled from 'styled-components';

import { useRipple } from './ripple';

const StyledWrapper = styled.div`
  user-select: none;
  background-color: ${({ theme }) => theme.colors.primary.hex()};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 200ms, box-shadow 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent.lighten(1.1).hex()};
  }

  --ripple-background-color: ${({ theme }) => theme.colors.accent.lighten(1).hex()};
`;

const StyledChildrenContainer = styled.div`
  position: relative;
`;

export const Clickable: Clickable.Component = ({ children, ...props }) => {
  const { ripples, sourceRef } = useRipple<HTMLDivElement>();

  return (
    <StyledWrapper {...props} ref={sourceRef}>
      {ripples}

      <StyledChildrenContainer>
        {children}
      </StyledChildrenContainer>
    </StyledWrapper>
  );
};

Clickable.displayName = 'Clickable';

export namespace Clickable {
  export type Component = FunctionComponent<PropsWithChildren<Props>>

  export interface Props {
    onClick(event: MouseEvent<HTMLDivElement>): void;
  }
}
