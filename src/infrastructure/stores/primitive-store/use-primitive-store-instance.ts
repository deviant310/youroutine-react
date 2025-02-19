import { useCallback, useMemo, useSyncExternalStore } from "react";

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

  const resetValue = useCallback(() => store.reset(), [store]);

  const dispatchers = useMemo(
    () => ({ setValue, setValueOn, setValueOff, resetValue }),
    [resetValue, setValue, setValueOff, setValueOn],
  );

  return <const>[value, dispatchers];
};

interface UsePrimitiveStoreInstance {
  <Value>(store: PrimitiveStore<Value>): UseUnknownStoreInstanceResult<Value>;
}

interface UsePrimitiveStoreInstance {
  <Value extends boolean | undefined>(
    store: PrimitiveStore<boolean>,
  ): UseBooleanStoreInstanceResult<Value>;
}

export type UseUnknownStoreInstanceResult<Value = unknown> = readonly [
  Value,
  { setValue(value: Value): void; resetValue(): void },
];

export type UseBooleanStoreInstanceResult<
  Value extends boolean | undefined = boolean | undefined,
> = readonly [Value, { setValueOn(): void; setValueOff(): void }];
