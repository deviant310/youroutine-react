import {
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { keyframes, styled } from "styled-components";

import { TransientProps } from "../../../../helpers";

export const Ripple = memo<RippleProps>(
  ({ offsetLeft, offsetTop, size, onRippleLeave, ...props }) => {
    const ref = useRef<HTMLSpanElement>(null);

    const containerStyle = useMemo(
      () => ({
        height: `${size}px`,
        left: `${offsetLeft}px`,
        top: `${offsetTop}px`,
        width: `${size}px`,
      }),
      [offsetLeft, offsetTop, size],
    );

    const onMouseUp = useCallback(() => {
      if (ref.current) ref.current.style.animationPlayState = "running";
    }, []);

    useEffect(() => {
      document.addEventListener("mouseup", onMouseUp, { once: true });

      return () => {
        document.removeEventListener("mouseup", onMouseUp);
      };
    }, [onMouseUp]);

    return (
      <StyledRippleContainer $size={size} style={containerStyle} {...props}>
        <StyledRipple
          style={{ animationPlayState: "paused" }}
          onAnimationEnd={onRippleLeave}
          $size={size}
          ref={ref}
        />
      </StyledRippleContainer>
    );
  },
);

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
  pointer-events: none;
  position: absolute;
  animation-name: ${rippleIncreaseAnimation};
  animation-duration: ${({ $size }) => $size / 500}s;
  animation-delay: 0ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const StyledRipple = styled.span<TransientProps<RippleStyledProps>>`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--ripple-background-color);
  animation-name: ${rippleOpacityAnimation};
  animation-duration: ${({ $size }) => $size / 500 / 2}s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

interface RippleStyledProps {
  size: number;
}

export interface RippleProps
  extends HTMLAttributes<HTMLSpanElement>,
    RippleStyledProps {
  onRippleLeave?(): void;
  offsetLeft: number;
  offsetTop: number;
}

export type RippleAnimationPlayState = "running" | "paused";
