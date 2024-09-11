import { Store } from "./store";
import { StoreController } from "./store-controller";
import { useStoreInstance } from "./use-store-instance";

export const createStore = <Value>() => {
  const storeController = new StoreController<Value>();

  const useStore = <InitialValue extends Value | undefined>(
    initialValue?: InitialValue,
  ) => {
    const store = new Store(storeController, initialValue);

    return useStoreInstance(store);
  };

  return { useStore };
};
