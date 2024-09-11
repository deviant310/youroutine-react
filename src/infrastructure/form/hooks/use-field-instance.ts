import { useCallback, useSyncExternalStore } from "react";

import { Field } from "../field";
import {
  FormFieldConfig,
  FormFieldError,
  FormValues,
} from "../form-controller";

export const useFieldInstance = <
  Values extends FormValues,
  Name extends keyof Values,
  Config extends FormFieldConfig<Values[Name]> | undefined,
>(
  field: Field<Values, Name, Config>,
) => {
  type Value = Values[Name];

  const { value, error } = useSyncExternalStore(field.onChange, field.getState);
  const name = field.name;

  const setValue = useCallback(
    (value: Value) => field.setValue(value),
    [field],
  );

  const setError = useCallback(
    (error: FormFieldError) => field.setError(error),
    [field],
  );

  return {
    name,
    value,
    setValue,
    error,
    setError,
  };
};
