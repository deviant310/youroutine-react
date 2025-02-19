import { PrimitiveStore } from "./primitive-store";
import {
  UseBooleanStoreInstanceResult,
  usePrimitiveStoreInstance,
  UseUnknownStoreInstanceResult,
} from "./use-primitive-store-instance";

export const createPrimitiveStore: CreatePrimitiveStore = (
  initialValue: unknown,
) => {
  const store = new PrimitiveStore(initialValue);

  return () =>
    usePrimitiveStoreInstance(store) as UseUnknownStoreInstanceResult<unknown> &
      UseBooleanStoreInstanceResult;
};

interface CreatePrimitiveStore {
  <Value>(initialValue: Value): () => UseUnknownStoreInstanceResult<Value>;
}

interface CreatePrimitiveStore {
  <Value extends boolean | undefined>(
    initialValue: Value,
  ): () => UseBooleanStoreInstanceResult<Value>;
}
