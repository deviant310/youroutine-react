/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrimitiveStore } from "./primitive-store";
import {
  PrimitiveStoreState,
  ToggleStoreState,
  usePrimitiveStoreInstance,
} from "./use-primitive-store-instance";

export const createPrimitiveStore: CreatePrimitiveStore = (
  initialValue: any,
) => {
  const store = new PrimitiveStore(initialValue);

  const useStore = () => usePrimitiveStoreInstance(store);

  return { useStore };
};

interface CreatePrimitiveStore {
  <Value>(initialValue: Value): {
    useStore(): PrimitiveStoreState<Value>;
  };
}

interface CreatePrimitiveStore {
  <Value extends boolean>(
    initialValue: Value,
  ): {
    useStore(): ToggleStoreState;
  };
}
