import { useCallback, useSyncExternalStore } from "react";

import { Store } from "./store";

export const useStoreInstance = <Value, InitialValue extends Value | undefined>(
  store: Store<Value, InitialValue>,
) => {
  const value = useSyncExternalStore(store.onChange, store.getValue);

  const setValue = useCallback(
    (value: Value) => store.setValue(value),
    [store],
  );

  const reset = useCallback(() => store.reset(), [store]);

  return {
    value: value as InitialValue extends Value
      ? InitialValue
      : Value | undefined,
    setValue,
    reset,
  };
};
