import { PrimitiveStore } from "./primitive-store";
import { usePrimitiveStoreInstance } from "./use-primitive-store-instance";

export const createPrimitiveStore = <Value>(initialValue: Value) => {
  const store = new PrimitiveStore(initialValue);

  const useValue = () => usePrimitiveStoreInstance(store);

  return { useValue };
};
