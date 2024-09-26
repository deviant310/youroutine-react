import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Ripple } from "./ripple";

export function useRipple<T extends HTMLElement | undefined>(element: T) {
  const [, setRenderingMark] = useState({});
  const [rippleSize, setRippleSize] = useState(0);
  //const ref = useRef<T>(null);
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
        if (!element) return;

        const { left, top } = element.getBoundingClientRect();

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
    [element, removeRipple, rippleSize],
  );

  useEffect(() => {
    element?.addEventListener("mousedown", onMouseDown);

    setRippleSize((element?.offsetWidth ?? 0) * 2);

    return () => {
      element?.removeEventListener("mousedown", onMouseDown);
    };
  }, [element, onMouseDown]);

  return useMemo(() => ({ ripples }), [ripples]);
}
