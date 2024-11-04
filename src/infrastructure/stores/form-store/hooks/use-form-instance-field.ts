import { useCallback, useSyncExternalStore } from "react";

import { PartialDiff } from "~/typescript";

import { FormStore } from "../form-store";

export const useFormInstanceField = <
  Values,
  ValidValues extends Values & PartialDiff<Values, ValidValues>,
  Name extends keyof Values,
>(
  form: FormStore<Values, ValidValues>,
  name: Name,
) => {
  const { value, error, dirty } = useSyncExternalStore(
    listener => form.onChange(listener),
    () => form.getFieldState(name),
  );

  const setValue = useCallback(
    (value: Values[Name]) => form.setFieldValue(name, value),
    [form, name],
  );

  const setError = useCallback(
    (error: string) => form.setFieldError(name, error),
    [form, name],
  );

  const stain = useCallback(() => form.stainField(name), [form, name]);

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
