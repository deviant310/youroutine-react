import { Store } from "./store";
import { StoreController } from "./store-controller";
import { useStoreInstance } from "./use-store-instance";

export const createStore = <Value>(initialValue: Value) => {
  const storeController = new StoreController(initialValue);

  const useStore = () => {
    const store = new Store(storeController);

    return useStoreInstance(store);
  };

  return { useStore };
};
