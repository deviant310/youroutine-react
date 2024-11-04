import { useCallback, useSyncExternalStore } from "react";

import { ValueStore } from "./value-store";

export const useValueStoreInstance = <Value>(valueStore: ValueStore<Value>) => {
  const value = useSyncExternalStore(valueStore.onChange, valueStore.getValue);

  const setValue = useCallback(
    (value: Value) => valueStore.setValue(value),
    [valueStore],
  );

  const reset = useCallback(() => valueStore.reset(), [valueStore]);

  return { value, setValue, reset };
};
