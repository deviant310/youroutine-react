import { PrimitiveStore } from "./primitive-store";
import {
  UseBooleanStoreInstanceResult,
  usePrimitiveStoreInstance,
  UsePrimitiveStoreInstanceResult,
} from "./use-primitive-store-instance";

export const createPrimitiveStore: CreatePrimitiveStore = (
  initialValue: unknown,
) => {
  const store = new PrimitiveStore(initialValue);

  return () =>
    usePrimitiveStoreInstance(
      store,
    ) as UsePrimitiveStoreInstanceResult<unknown> &
      UseBooleanStoreInstanceResult;
};

interface CreatePrimitiveStore {
  <Value>(initialValue: Value): () => UsePrimitiveStoreInstanceResult<Value>;
}

interface CreatePrimitiveStore {
  <Value extends boolean | undefined>(
    initialValue: Value,
  ): () => UseBooleanStoreInstanceResult<Value>;
}
