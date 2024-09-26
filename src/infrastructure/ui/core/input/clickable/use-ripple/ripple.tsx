import {
  AnimationEvent,
  FunctionComponent,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { keyframes, styled } from "styled-components";

import { TransientProps } from "../../../../helpers";

export const Ripple = memo<RippleProps>(props => {
  const { offsetLeft, offsetTop, size, onRippleEnd, ...restProps } = props;

  const [animationPlayState, setAnimationPlayState] =
    useState<RippleAnimationPlayState>("paused");
  const containerRef = useRef<HTMLElement>(null);

  const onAnimationEnd = useCallback(
    ({ target }: AnimationEvent<HTMLElement>) => {
      if (target === containerRef.current) onRippleEnd?.();
    },
    [onRippleEnd],
  );

  const containerStyle = useMemo(
    () => ({ animationPlayState }),
    [animationPlayState],
  );

  const rippleStyle = useMemo(
    () => ({
      height: `${size}px`,
      left: `${offsetLeft}px`,
      top: `${offsetTop}px`,
      width: `${size}px`,
    }),
    [offsetLeft, offsetTop, size],
  );

  const onMouseUp = useCallback(() => setAnimationPlayState("running"), []);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);

  return (
    <StyledRippleContainer
      ref={containerRef}
      $size={size}
      style={containerStyle}
      onAnimationEnd={onAnimationEnd}
      {...restProps}
    >
      <StyledRipple $size={size} style={rippleStyle} />
    </StyledRippleContainer>
  );
});

const rippleOpacityAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const rippleIncreaseAnimation = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledRippleContainer = styled.span<TransientProps<RippleStyledProps>>`
  animation-name: ${rippleOpacityAnimation};
  animation-duration: ${({ $size }) => $size / 500 / 2}s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const StyledRipple = styled.span<TransientProps<RippleStyledProps>>`
  pointer-events: none;
  position: absolute;
  background-color: var(--ripple-background-color);
  animation-name: ${rippleIncreaseAnimation};
  animation-duration: ${({ $size }) => $size / 500}s;
  animation-delay: 0ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  border-radius: 50%;
  transform: scale(0);
`;

export type RippleComponent = FunctionComponent<RippleProps>;

interface RippleStyledProps {
  size: number;
}

export interface RippleProps
  extends HTMLAttributes<HTMLSpanElement>,
    RippleStyledProps {
  onRippleEnd?(): void;
  offsetLeft: number;
  offsetTop: number;
}

export type RippleAnimationPlayState = "running" | "paused";
