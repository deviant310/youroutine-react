import { useCallback, useSyncExternalStore } from "react";

import { PrimitiveStore } from "./primitive-store";

export const usePrimitiveStoreInstance: UsePrimitiveStoreInstance = (
  store: PrimitiveStore<unknown>,
) => {
  const value = useSyncExternalStore(
    notify => store.onChange(notify),
    () => store.getValue(),
  );

  const setValue = useCallback(
    (value: unknown) => store.setValue(value),
    [store],
  );

  const setValueOn = useCallback(() => store.setValue(true), [store]);

  const setValueOff = useCallback(() => store.setValue(false), [store]);

  const reset = useCallback(() => store.reset(), [store]);

  return {
    value,
    setValue,
    setValueOn,
    setValueOff,
    reset,
  };
};

interface UsePrimitiveStoreInstance {
  <Value>(store: PrimitiveStore<Value>): UsePrimitiveStoreInstanceResult<Value>;
}

interface UsePrimitiveStoreInstance {
  <Value extends boolean | undefined>(
    store: PrimitiveStore<Value>,
  ): UseBooleanStoreInstanceResult<Value>;
}

export interface UsePrimitiveStoreInstanceResult<Value> {
  value: Value;
  setValue(value: Value): void;
}

export interface UseBooleanStoreInstanceResult<
  Value extends boolean | undefined = boolean | undefined,
> {
  value: Value;
  setValueOn(): void;
  setValueOff(): void;
}
