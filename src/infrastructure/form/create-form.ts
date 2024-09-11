import { Field } from "./field";
import { Form } from "./form";
import {
  FormController,
  FormFieldConfig,
  FormFieldError,
  FormValues,
} from "./form-controller";
import { useFormInstance, useFieldInstance } from "./hooks";

export const createForm = <Values extends FormValues>() => {
  const formController = new FormController<Values>();

  const useForm = () => {
    const form = new Form(formController);

    return useFormInstance(form);
  };

  const useField: FieldHook<Values> = (name, config) => {
    const field = new Field(formController, name, config);

    return useFieldInstance(field);
  };

  return { useForm, useField };
};

interface FieldHook<Values extends FormValues> {
  <Name extends keyof Values>(
    name: Name,
    config?: never,
  ): FieldHookApproxResult<Name, Values[Name]>;

  <Name extends keyof Values>(
    name: Name,
    config: FormFieldConfig<Values[Name]>,
  ): FieldHookExactResult<Name, Values[Name]>;
}

interface FieldHookApproxResult<Name, Value> {
  name: Name;
  value: Value | undefined;
  setValue: (value: Value) => void;
  error?: FormFieldError;
  setError(error: FormFieldError): void;
}

interface FieldHookExactResult<Name, Value> {
  name: Name;
  value: Value;
  setValue: (value: Value) => void;
  error?: FormFieldError;
  setError(error: FormFieldError): void;
}
