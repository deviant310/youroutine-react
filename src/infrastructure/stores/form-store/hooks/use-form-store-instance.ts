import { useSyncExternalStore } from "react";

import { PartialMatch } from "~/typescript";

import { FormStore } from "../form-store";

export const useFormStoreInstance = <
  Values,
  ValidValues extends Values & PartialMatch<Values, ValidValues>,
>(
  store: FormStore<Values, ValidValues>,
) => {
  useSyncExternalStore(
    listener => store.onChange(listener),
    () => store.getState(),
  );

  return store;
};
