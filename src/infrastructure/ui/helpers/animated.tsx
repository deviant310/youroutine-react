import {
  useRef,
  useState,
  useEffect,
  ForwardRefExoticComponent,
  useCallback,
} from "react";

import { keyframes, styled } from "styled-components";

export function animated<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component extends ForwardRefExoticComponent<any>,
>(component: Component, animationType: AnimationType) {
  const [animationIn, animationOut] = animationTypes[animationType];
  const AnimatedContainerStyled = styled(component)`
    animation-name: ${({ $visible }) =>
      $visible ? animationIn : animationOut};
    animation-duration: 150ms;
    animation-delay: 0ms;
    animation-timing-function: ${({ $visible }) =>
      $visible ? "ease-out" : "ease-in"};
    animation-fill-mode: forwards;
    transform-origin: top;
  `;

  const Animated = (({ children, ...props }) => {
    const ref = useRef<HTMLElement>(null);
    const lastNode = useRef(children);
    const [node, setNode] = useState(children);
    const [nodeIsVisible, setNodeVisibility] = useState(Boolean(node));

    const onAnimationEnd = useCallback(
      (event: AnimationEvent) => {
        if (event.currentTarget === event.target) {
          setNode(children);
        }
      },
      [children],
    );

    useEffect(() => {
      if (children) {
        setNode(children);

        setNodeVisibility(true);
      } else {
        setNodeVisibility(false);

        if (Boolean(lastNode.current) === Boolean(children)) return;

        const { current: element } = ref;

        element?.addEventListener("animationend", onAnimationEnd);

        return () =>
          element?.removeEventListener("animationend", onAnimationEnd);
      }

      lastNode.current = children;
    }, [children, onAnimationEnd]);

    return (
      <AnimatedContainerStyled ref={ref} $visible={nodeIsVisible} {...props}>
        {node}
      </AnimatedContainerStyled>
    );
  }) as Component;

  Animated.displayName = "Animated";

  return Animated;
}

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const slideInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scaleY(.9);
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const slideOutAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(.9);
    opacity: 0;
  }
`;

const animationTypes: Record<
  AnimationType,
  [ReturnType<typeof keyframes>, ReturnType<typeof keyframes>]
> = {
  slide: [slideInAnimation, slideOutAnimation],
  fade: [fadeInAnimation, fadeOutAnimation],
};

type AnimationType = "slide" | "fade";
