import { useCallback, useSyncExternalStore } from "react";

import { Form } from "../form";
import { FormValues } from "../form-controller";

export const useFormInstance = <Values extends FormValues>(
  form: Form<Values>,
) => {
  const { values, errors } = useSyncExternalStore(form.onChange, form.getState);

  const isValid = form.isValid;

  const setValues = useCallback(
    (values: Values) => form.setValues(values),
    [form],
  );

  const reset = useCallback(() => form.reset(), [form]);

  return {
    values,
    setValues,
    errors,
    isValid,
    reset,
  };
};
