import { useCallback, useSyncExternalStore } from "react";

import { Store } from "./store";

export const useStoreInstance = <Value>(store: Store<Value>) => {
  const value = useSyncExternalStore(store.onChange, store.getValue);

  const setValue = useCallback(
    (value: Value) => store.setValue(value),
    [store],
  );

  const reset = useCallback(() => store.reset(), [store]);

  return { value, setValue, reset };
};
