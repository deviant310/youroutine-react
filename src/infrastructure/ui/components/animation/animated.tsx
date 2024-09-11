import { useRef, useState, useEffect, ForwardRefExoticComponent } from "react";

import { styled } from "styled-components";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function animated<Component extends ForwardRefExoticComponent<any>>(
  component: Component,
) {
  const AnimatedContainerStyled = styled(component)`
    transition:
      transform 0.1s,
      opacity 0.1s;
    transform: translate(0, ${({ $visible }) => ($visible ? "0%" : "-0.5rem")});
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  `;

  return (({ children, ...props }) => {
    const ref = useRef<HTMLElement>(null);
    const lastNode = useRef(children);
    const [node, setNode] = useState(children);
    const [nodeIsVisible, setNodeVisibility] = useState(Boolean(node));

    useEffect(() => {
      if (children) {
        setNode(children);

        setNodeVisibility(true);
      } else {
        setNodeVisibility(false);

        if (Boolean(lastNode.current) === Boolean(children)) return;

        ref.current?.addEventListener(
          "transitionend",
          () => {
            setNode(children);
          },
          { once: true },
        );
      }

      lastNode.current = children;
    }, [children]);

    return (
      <AnimatedContainerStyled ref={ref} $visible={nodeIsVisible} {...props}>
        {node}
      </AnimatedContainerStyled>
    );
  }) as Component;
}
