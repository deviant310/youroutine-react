import { PartialDiff } from "~/typescript";

import { FormStore } from "./form-store";
import { FormFieldsConfig } from "./form-store-init";
import { useFormInstance, useFormInstanceField } from "./hooks";

export const createFormStore = <
  Values,
  ValidValues extends Values & PartialDiff<Values, ValidValues> = Values,
>(
  fieldsConfig: FormFieldsConfig<Values, ValidValues>,
) => {
  const form = new FormStore<Values, ValidValues>(fieldsConfig);

  const useForm = () => useFormInstance(form);

  const useField = <Name extends keyof Values>(name: Name) =>
    useFormInstanceField(form, name);

  return { useForm, useField } as const;
};
