import { useSyncExternalStore } from "react";

import { PartialMatch } from "~/typescript";

import { FormStore } from "../form-store";

export const useFormStoreInstance = <
  Values,
  ValidValues extends Values & PartialMatch<Values, ValidValues>,
>(
  formStore: FormStore<Values, ValidValues>,
) => {
  useSyncExternalStore(
    notify => formStore.onChange(notify),
    () => formStore.getState(),
  );

  return formStore;
};
