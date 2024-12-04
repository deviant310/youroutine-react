import { useCallback, useSyncExternalStore } from "react";

import { PrimitiveStore } from "./primitive-store";

export const usePrimitiveStoreInstance = <Value>(
  store: PrimitiveStore<Value>,
) => {
  const value = useSyncExternalStore(
    listener => store.onChange(listener),
    () => store.getValue(),
  );

  const setValue = useCallback(
    (value: Value) => store.setValue(value),
    [store],
  );

  const setValueOn = useCallback(() => store.setValue(true as Value), [store]);

  const setValueOff = useCallback(
    () => store.setValue(false as Value),
    [store],
  );

  const reset = useCallback(() => store.reset(), [store]);

  return { value, setValue, setValueOn, setValueOff, reset };
};

export interface PrimitiveStoreState<Value> {
  value: Value;
  setValue(value: Value): void;
}

export interface ToggleStoreState {
  value: boolean;
  setValueOn(): void;
  setValueOff(): void;
}
