import { AnimationEvent, CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled, { keyframes } from 'styled-components';

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
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
`;

const StyledRippleContainer = styled.span`
  animation-name: ${rippleOpacityAnimation};
  animation-duration: 500ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
`;

const StyledRipple = styled.span`
  pointer-events: none;
  position: absolute;
  background-color: var(--ripple-background-color);
  animation-name: ${rippleIncreaseAnimation};
  animation-duration: 1000ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  border-radius: 50%;
`;

const Ripple = (props: Ripple.Props) => {
  const { destructor: destroyRipple, style } = props;
  const [animationIsRunning, setAnimationPlayState] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const containerStyle = useMemo(
    () => ({
      animationPlayState: animationIsRunning ? 'running' : 'paused'
    }),
    [animationIsRunning]
  );

  const onMouseUp = useCallback(
    () => setAnimationPlayState(true),
    []
  );

  const onAnimationEnd = useCallback(
    ({ target }: AnimationEvent<HTMLElement>) => {
      if (target === containerRef.current)
        destroyRipple();
    },
    [destroyRipple]
  );

  useEffect(
    () => {
      document.addEventListener('mouseup', onMouseUp);

      return () => {
        document.removeEventListener('mouseup', onMouseUp);
      };
    },
    [onMouseUp]
  );

  return (
    <StyledRippleContainer
      onAnimationEnd={onAnimationEnd}
      ref={containerRef}
      style={containerStyle}
    >
      <StyledRipple style={style}/>
    </StyledRippleContainer>
  );
};

namespace Ripple {
  export interface Props {
    destructor (): void;

    style: CSSProperties;
  }
}

export default Ripple;
