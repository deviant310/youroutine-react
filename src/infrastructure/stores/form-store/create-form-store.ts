import { PartialMatch } from "~/typescript";

import { FormStore } from "./form-store";
import { FormFieldsConfig } from "./form-store-init";
import { useFormStoreInstance, useFormStoreInstanceField } from "./hooks";

export const createFormStore = <
  Values,
  ValidValues extends Values & PartialMatch<Values, ValidValues> = Values,
>(
  fieldsConfig: FormFieldsConfig<Values, ValidValues>,
) => {
  const store = new FormStore<Values, ValidValues>(fieldsConfig);

  const useForm = () => useFormStoreInstance(store);

  const useField = <Name extends keyof Values>(name: Name) =>
    useFormStoreInstanceField(store, name);

  return { useForm, useField };
};
