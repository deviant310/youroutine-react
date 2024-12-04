import { useCallback, useSyncExternalStore } from "react";

import { PartialMatch } from "~/typescript";

import { FormStore } from "../form-store";

export const useFormStoreInstanceField = <
  Values,
  ValidValues extends Values & PartialMatch<Values, ValidValues>,
  Name extends keyof Values,
>(
  store: FormStore<Values, ValidValues>,
  name: Name,
) => {
  const { value, error, dirty } = useSyncExternalStore(
    listener => store.onChange(listener),
    () => store.getFieldState(name),
  );

  const setValue = useCallback(
    (value: Values[Name]) => store.setFieldValue(name, value),
    [name, store],
  );

  const setError = useCallback(
    (error: string) => store.setFieldError(name, error),
    [name, store],
  );

  const stain = useCallback(() => store.stainField(name), [name, store]);

  return {
    name,
    value,
    setValue,
    error,
    setError,
    dirty,
    stain,
  };
};
