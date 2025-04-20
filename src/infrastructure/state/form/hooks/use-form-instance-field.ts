/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useSyncExternalStore } from "react";

import { Form } from "../form";

export const useFormInstanceField = <
  Name extends keyof Values,
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  Conditionals extends keyof Values = never,
>(
  form: Form<Values, ValidValues, Conditionals>,
  name: Name,
) => {
  type Result = Name extends Conditionals ? typeof data | null : typeof data;

  const field = useSyncExternalStore(
    dispatch => form.onChange(dispatch),
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

  const reset = useCallback(() => form.resetField(name), [form, name]);

  if (!field) return null as Result;

  const data = { ...field, name, setValue, setError, reset };

  return data as Result;
};
