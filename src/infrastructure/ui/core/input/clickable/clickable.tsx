import { HTMLAttributes, memo, ElementRef } from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../../helpers";

import { useRipple } from "./use-ripple";
// TODO type=primary|secondary...
export const Clickable = memo<ClickablePropsWithHTMLAttributes>(
  ({ children, disabled, ...props }) => {
    const { ref, ripples } = useRipple<ClickableElement>();

    return (
      <ClickableStyled $disabled={disabled} {...props} ref={ref}>
        <ClickableAreaStyled>{ripples}</ClickableAreaStyled>
        <ClickableContentStyled>{children}</ClickableContentStyled>
      </ClickableStyled>
    );
  },
);

const ClickableStyled = styled.div<TransientProps<ClickableStyledProps>>`
  user-select: none;
  pointer-events: ${({ $disabled }) => $disabled && "none"};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: ${({ $disabled }) => $disabled && "50%"};
  transition-duration: 150ms;
  transition-property: background-color, opacity;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[8].transparent()};
  }

  --ripple-background-color: ${({ theme }) =>
    theme.colors.primary[8].transparent()};
`;

const ClickableAreaStyled = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const ClickableContentStyled = styled.div`
  position: relative;
  pointer-events: none;
`;

export interface ClickableStyledProps {
  disabled?: boolean;
}

export type ClickableProps = ClickableStyledProps;

interface ClickablePropsWithHTMLAttributes
  extends HTMLAttributes<ClickableElement>,
    ClickableProps {}

export type ClickableElement = ElementRef<typeof ClickableStyled>;
