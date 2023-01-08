import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import Ripple from './ripple';

type Action = {
  payload: JSX.Element;
  type: 'add' | 'remove';
}

function ripplesReducer (state: JSX.Element[], action: Action) {
  const stateHasPayload = state.includes(action.payload);

  switch (action.type) {
    case 'add':
      return stateHasPayload
        ? state
        : state.concat(action.payload);

    case 'remove':
      return stateHasPayload
        ? state.filter(item => item !== action.payload)
        : state;
  }
}

export function useRipple<T extends HTMLElement> () {
  const [ripples, setRipple] = useReducer(ripplesReducer, []);
  const [rippleSize, setRippleSize] = useState(0);
  const sourceRef = useRef<T>(null);

  const payload = useMemo(
    () => ({ ripples, sourceRef }),
    [ripples]
  );

  const onMouseDown = useCallback(
    ({ button, clientX, clientY }: MouseEvent) => {
      if (button === 2) return;

      requestAnimationFrame(() => {
        const sourceElement = sourceRef.current;

        if (!sourceElement) return;

        const { left, top } = sourceElement.getBoundingClientRect();

        const ripple = (
          <Ripple
            destructor={() => {
              setRipple({
                payload: ripple,
                type: 'remove'
              });
            }}
            key={Math.floor(Math.random() * 1e15)}
            offsetLeft={clientX - left - rippleSize / 2}
            offsetTop={clientY - top - rippleSize / 2}
            size={rippleSize}
          />
        );

        setRipple({
          payload: ripple,
          type: 'add'
        });

      });
    },
    [rippleSize]
  );

  useEffect(
    () => {
      const sourceElement = sourceRef.current;

      sourceElement?.addEventListener('mousedown', onMouseDown);

      setRippleSize(
        (sourceElement?.offsetWidth ?? 0) * 2
      );

      return () => {
        sourceElement?.removeEventListener('mousedown', onMouseDown);
      };
    },
    [onMouseDown]
  );

  return payload;
}
