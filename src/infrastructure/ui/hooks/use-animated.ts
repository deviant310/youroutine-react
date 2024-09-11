import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { animated } from "../components/animation/animated";
/**
 * @deprecated use animated hoc
 * @see animated
 */
export function useAnimated(node: ReactNode) {
  const ref = useRef<HTMLElement>(null);
  const lastNode = useRef(node);
  const [suspendableNode, setSuspendableNode] = useState(node);
  const [nodeIsVisible, setNodeVisibility] = useState(Boolean(node));

  useEffect(() => {
    if (node) {
      setSuspendableNode(node);

      setNodeVisibility(true);
    } else {
      setNodeVisibility(false);

      if (Boolean(lastNode.current) === Boolean(node)) return;

      ref.current?.addEventListener(
        "transitionend",
        () => {
          setSuspendableNode(node);
        },
        { once: true },
      );
    }

    lastNode.current = node;
  }, [node]);

  return useMemo(
    () => <const>[ref, suspendableNode, nodeIsVisible],
    [nodeIsVisible, suspendableNode],
  );
}
