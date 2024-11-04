import { useValueStoreInstance } from "./use-value-store-instance";
import { ValueStore } from "./value-store";

export const createValueStore = <Value>(initialValue: Value) => {
  const valueStore = new ValueStore(initialValue);

  const useValue = () => useValueStoreInstance(valueStore);

  return { useValue };
};
