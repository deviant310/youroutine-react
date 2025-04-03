import { useCallback, useSyncExternalStore } from "react";

import { PartialMatch } from "~/typescript";

import { FormStore } from "../form-store";

export const useFormStoreInstanceField = <
  Values,
  ValidValues extends Values & PartialMatch<Values, ValidValues>,
  Name extends keyof Values,
>(
  formStore: FormStore<Values, ValidValues>,
  name: Name,
) => {
  const { value, error, dirty } = useSyncExternalStore(
    listener => formStore.onChange(listener),
    () => formStore.getFieldState(name),
  );

  const setValue = useCallback(
    (value: Values[Name]) => formStore.setFieldValue(name, value),
    [formStore, name],
  );

  const setError = useCallback(
    (error: string) => formStore.setFieldError(name, error),
    [formStore, name],
  );

  const reset = useCallback(
    () => formStore.resetField(name),
    [formStore, name],
  );

  const stain = useCallback(
    () => formStore.stainField(name),
    [formStore, name],
  );

  return {
    name,
    value,
    setValue,
    error,
    setError,
    dirty,
    stain,
    reset,
  };
};
