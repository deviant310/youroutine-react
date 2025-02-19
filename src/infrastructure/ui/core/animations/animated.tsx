import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  NamedExoticComponent,
} from "react";

import { css, RuleSet, styled } from "styled-components";

import { TransientProps } from "../../helpers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function animated<Component extends NamedExoticComponent<any>>(
  component: Component,
  animationType: AnimationType,
) {
  const [animationIn, animationOut] = animationTypes[animationType];

  const AnimatedContainerStyled = styled(component)<
    TransientProps<{ visible: boolean }>
  >`
    ${({ $visible }) => ($visible ? animationIn : animationOut)}
  `;

  const Animated = forwardRef(({ children, ...props }, ref) => {
    const [node, setNode] = useState(children);

    const onTransitionEnd = useCallback(
      (event: TransitionEvent) => {
        if (children) return;
        if (event.currentTarget === event.target) setNode(children);
      },
      [children],
    );

    useEffect(() => {
      if (children) setNode(children);
    }, [children]);

    return (
      <AnimatedContainerStyled
        $visible={Boolean(children)}
        onTransitionEnd={onTransitionEnd}
        {...props}
        ref={ref}
      >
        {node}
      </AnimatedContainerStyled>
    );
  }) as typeof component;

  Animated.displayName = "Animated";

  return Animated;
}

const scaleTransition = css`
  transform-origin: top;
  transition-duration: 150ms;
  transition-property: transform, opacity;
`;

const scaleInTransition = css`
  ${scaleTransition};
  transform: scaleY(1);
  opacity: 1;
`;

const scaleOutTransition = css`
  ${scaleTransition};
  transform: scaleY(0.9);
  opacity: 0;
`;

const fadeTransition = css`
  transform-origin: top;
  transition-duration: 150ms;
  transition-property: opacity;
`;

const fadeInTransition = css`
  ${fadeTransition};
  opacity: 1;
`;

const fadeOutTransition = css`
  ${fadeTransition};
  opacity: 0;
`;

const slideTransition = css`
  transform-origin: top;
  transition:
    transform 150ms,
    opacity 150ms;
`;

const slideInTransition = css`
  ${slideTransition};
  transform: translateY(0);
  opacity: 1;
`;

const slideOutTransition = css`
  ${slideTransition};
  transform: translateY(-20%);
  opacity: 0;
`;

const animationTypes: Record<AnimationType, [RuleSet, RuleSet]> = {
  scale: [scaleInTransition, scaleOutTransition],
  fade: [fadeInTransition, fadeOutTransition],
  slide: [slideInTransition, slideOutTransition],
};

type AnimationType = "scale" | "fade" | "slide";
