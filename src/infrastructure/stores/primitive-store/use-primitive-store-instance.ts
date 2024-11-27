import { useCallback, useSyncExternalStore } from "react";

import { PrimitiveStore } from "./primitive-store";

export const usePrimitiveStoreInstance = <Value>(
  store: PrimitiveStore<Value>,
) => {
  const value = useSyncExternalStore(store.onChange, store.getValue);

  const setValue = useCallback(
    (value: Value) => store.setValue(value),
    [store],
  );

  const reset = useCallback(() => store.reset(), [store]);

  return { value, setValue, reset };
};
