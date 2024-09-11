import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Ripple } from "./ripple";

export function useRipple<T extends HTMLElement>() {
  const [, setRenderingMark] = useState({});
  const [rippleSize, setRippleSize] = useState(0);
  const ref = useRef<T>(null);
  const ripplesSet = useRef(new Set<ReactNode>());
  const ripples = Array.from(ripplesSet.current);

  const removeRipple = useCallback((ripple: ReactNode) => {
    ripplesSet.current.delete(ripple);

    setRenderingMark({});
  }, []);

  const onMouseDown = useCallback(
    ({ button, clientX, clientY }: MouseEvent) => {
      if (button === 2) return;

      requestAnimationFrame(() => {
        const sourceElement = ref.current;

        if (!sourceElement) return;

        const { left, top } = sourceElement.getBoundingClientRect();

        const ripple = (
          <Ripple
            onRippleEnd={() => removeRipple(ripple)}
            key={Math.floor(Math.random() * 1e15)}
            offsetLeft={clientX - left - rippleSize / 2}
            offsetTop={clientY - top - rippleSize / 2}
            size={rippleSize}
          />
        );

        ripplesSet.current.add(ripple);

        setRenderingMark({});
      });
    },
    [removeRipple, rippleSize, ripplesSet],
  );

  useEffect(() => {
    const sourceElement = ref.current;

    sourceElement?.addEventListener("mousedown", onMouseDown);

    setRippleSize((sourceElement?.offsetWidth ?? 0) * 2);

    return () => {
      sourceElement?.removeEventListener("mousedown", onMouseDown);
    };
  }, [onMouseDown]);

  return useMemo(() => ({ ref, ripples }), [ripples]);
}
