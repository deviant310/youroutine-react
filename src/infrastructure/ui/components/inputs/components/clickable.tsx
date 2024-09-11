import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithChildren,
  RefAttributes,
  forwardRef,
  memo,
} from "react";

import { styled } from "styled-components";

import { useRipple } from "../hooks";

export const Clickable: ClickableComponent = memo(
  forwardRef((props, ref) => {
    const { children, ...restProps } = props;
    const { ref: rippleRef, ripples } = useRipple<HTMLDivElement>();

    return (
      <ClickableWrapperStyled {...restProps} ref={ref}>
        <div ref={rippleRef}>
          {ripples}

          <StyledChildrenContainer>{children}</StyledChildrenContainer>
        </div>
      </ClickableWrapperStyled>
    );
  }),
);

const ClickableWrapperStyled = styled.div`
  user-select: none;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition:
    background-color 200ms,
    box-shadow 200ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.default[8].transparent()};
  }

  --ripple-background-color: ${({ theme }) =>
    theme.colors.default[7].transparent()};
`;

ClickableWrapperStyled.displayName = "ClickableWrapperStyled";

const StyledChildrenContainer = styled.div`
  position: relative;
`;

export type ClickableComponent = ForwardRefExoticComponent<
  ClickableProps & RefAttributes<ClickableElement>
>;

export type ClickableProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export type ClickableElement = HTMLDivElement;
