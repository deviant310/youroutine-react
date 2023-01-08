import { AnimationEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
    transform: scale(0);
  }
  100% {
    transform: scale(1);
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
  animation-duration: 500ms;
  animation-delay: 10ms;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  border-radius: 50%;
  transform: scale(0);
`;

const Ripple = (props: Ripple.Props) => {
  const { destructor: destroyRipple, offsetLeft, offsetTop, size } = props;
  const [animationPlayState, setAnimationPlayState] = useState<Ripple.AnimationPlayState>('paused');
  const containerRef = useRef<HTMLElement>(null);

  const containerStyle = useMemo(
    () => ({ animationPlayState }),
    [animationPlayState]
  );

  const rippleStyle = useMemo(
    () => ({
      height: `${size}px`,
      left: `${offsetLeft}px`,
      top: `${offsetTop}px`,
      width: `${size}px`,
    }),
    [offsetLeft, offsetTop, size]
  );

  const onMouseUp = useCallback(
    () => {
      setAnimationPlayState('running');
    },
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
      <StyledRipple style={rippleStyle}/>
    </StyledRippleContainer>
  );
};

namespace Ripple {
  export interface Props {
    destructor (): void;
    offsetLeft: number;
    offsetTop: number;
    size: number;
  }

  export type AnimationPlayState =
    | 'running'
    | 'paused';
}

export default Ripple;
