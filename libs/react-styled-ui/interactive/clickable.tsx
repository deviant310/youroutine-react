import { PropsWithChildren } from 'react';

import styled from 'styled-components';

import { useRipple } from './ripple';

const StyledWrapper = styled.div`
  user-select: none;
  background-color: ${({ theme }) => theme.colors.clickableBackground};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 200ms, box-shadow 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.clickableHoveredBackground};
  }

  --ripple-background-color: ${({ theme }) => theme.colors.clickableActiveRippleBackground};
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

export namespace Clickable {
  export interface Component {
    <P> (props: PropsWithChildren<P>): JSX.Element;
  }
}
