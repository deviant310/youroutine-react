import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Ripple } from "./ripple";

export function useRipple<T extends HTMLElement | null>() {
  const [, updateState] = useState<object>();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [rippleSize, setRippleSize] = useState(0);
  const ref = useRef<T>(null);
  const ripplesSet = useRef(new Set<ReactNode>());
  const ripples = Array.from(ripplesSet.current);

  const removeRipple = useCallback(
    (ripple: ReactNode) => {
      ripplesSet.current.delete(ripple);

      forceUpdate();
    },
    [forceUpdate],
  );

  const onMouseDown = useCallback(
    ({ button, clientX, clientY }: MouseEvent) => {
      if (button === 2) return;

      setTimeout(() => {
        const { current: element } = ref;

        if (!element) return;

        const { left, top } = element.getBoundingClientRect();

        const ripple = (
          <Ripple
            onRippleLeave={() => {
              removeRipple(ripple);
            }}
            key={Math.floor(Math.random() * 1e15)}
            offsetLeft={clientX - left - rippleSize / 2}
            offsetTop={clientY - top - rippleSize / 2}
            size={rippleSize}
          />
        );

        ripplesSet.current.add(ripple);

        forceUpdate();
      }, 0);
    },
    [forceUpdate, removeRipple, rippleSize],
  );

  useEffect(() => {
    const { current: element } = ref;

    element?.addEventListener("mousedown", onMouseDown);

    setRippleSize((element?.offsetWidth ?? 0) * 2);

    return () => {
      element?.removeEventListener("mousedown", onMouseDown);
    };
  }, [onMouseDown]);

  return useMemo(() => ({ ref, ripples }), [ripples]);
}
