/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSyncExternalStore } from "react";

import { Form } from "../form";

export const useFormInstance = <
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  Conditionals extends keyof Values = never,
>(
  form: Form<Values, ValidValues, Conditionals>,
) => {
  const { fields, validValues } = useSyncExternalStore(
    dispatch => form.onChange(dispatch),
    () => form.getState(),
  );

  return { fields, validValues };
};
