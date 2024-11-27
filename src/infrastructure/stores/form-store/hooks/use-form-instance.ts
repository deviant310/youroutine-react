import { useSyncExternalStore } from "react";

import { PartialDiff } from "~/typescript";

import { FormStore } from "../form-store";

export const useFormInstance = <
  Values,
  ValidValues extends Values & PartialDiff<Values, ValidValues>,
>(
  form: FormStore<Values, ValidValues>,
) => {
  useSyncExternalStore(
    listener => form.onChange(listener),
    () => form.getState(),
  );

  return form;
};
