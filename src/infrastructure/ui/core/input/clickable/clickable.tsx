import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithChildren,
  RefAttributes,
  forwardRef,
  memo,
  useRef,
  ElementRef,
  useEffect,
  useState,
} from "react";

import { styled } from "styled-components";

import { TransientProps } from "../../../helpers";

import { useRipple } from "./use-ripple";

export const Clickable: ClickableComponent = memo(
  forwardRef((props, forwardedRef) => {
    const { children, disabled, ...restProps } = props;
    const localRef = useRef<ClickableElement>(null);
    const [element, setElement] = useState<ClickableElement>();

    const ref = forwardedRef ?? localRef;

    const { ripples } = useRipple(element);

    useEffect(() => {
      if ("current" in ref && ref.current) setElement(ref.current);
    }, [ref]);

    return (
      <ClickableStyled $disabled={disabled} {...restProps} ref={ref}>
        <ClickableAreaStyled>{ripples}</ClickableAreaStyled>
        <ClickableContentStyled>{children}</ClickableContentStyled>
      </ClickableStyled>
    );
  }),
);

const ClickableStyled = styled.div<TransientProps<ClickableStyledProps>>`
  user-select: none;
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: ${({ $disabled }) => $disabled && "50%"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.tension[7].transparent()};
  }

  --ripple-background-color: ${({ theme }) =>
    theme.colors.tension[8].transparent()};
`;

ClickableStyled.displayName = "ClickableStyled";

const ClickableAreaStyled = styled.div`
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

export type ClickableComponent = ForwardRefExoticComponent<
  ClickableProps & RefAttributes<ClickableElement>
>;

export interface ClickableStyledProps {
  disabled?: boolean;
}

export interface ClickableProps
  extends HTMLAttributes<ClickableElement>,
    ClickableStyledProps,
    PropsWithChildren {}

export type ClickableElement = ElementRef<typeof ClickableStyled>;
