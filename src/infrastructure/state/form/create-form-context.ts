/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  createElement,
  FC,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import { Form } from "./form";
import { FormFieldsConfig } from "./form-init";
import { useFormInstance, useFormInstanceField } from "./hooks";

export function createFormContext<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  Conditionals extends keyof Values = never,
>() {
  const formContext = createContext<Form<
    Values,
    ValidValues,
    Conditionals
  > | null>(null);

  const { Provider } = formContext;

  const FormProvider: FC<
    FormProviderProps<Values, ValidValues, Conditionals>
  > = ({ children, fieldsConfig }) => {
    const value = useMemo(() => new Form(fieldsConfig), [fieldsConfig]);

    return createElement(Provider, { value }, children);
  };

  const useDefinedContext = () => {
    const form = useContext(formContext);

    if (!form) throw new Error("Form hooks must be used within a FormProvider");

    return form;
  };

  const useFormState = () => {
    const form = useDefinedContext();

    return useFormInstance(form);
  };

  const useFormFieldState = <Name extends keyof Values>(name: Name) => {
    const form = useDefinedContext();

    return useFormInstanceField(form, name);
  };

  return { FormProvider, useFormState, useFormFieldState };
}

interface FormProviderProps<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  ConditionalFields extends keyof Values = never,
> {
  children: ReactNode;
  fieldsConfig: FormFieldsConfig<Values, ValidValues, ConditionalFields>;
}
