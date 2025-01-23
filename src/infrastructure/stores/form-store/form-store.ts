import { PartialMatch } from "~/typescript";

import { FormFieldState, FormStoreInit } from "./form-store-init";

export class FormStore<
  Values,
  ValidValues extends Values & PartialMatch<Values, ValidValues> = Values,
> extends FormStoreInit<Values, ValidValues> {
  getState() {
    return this.formState as this extends FormStore<ValidValues>
      ? FormStore<ValidValues>["formState"]
      : FormStore<Values>["formState"];
  }

  valid(): this is FormStore<ValidValues> {
    const formHasErrors = Object.values(this.formState.errors).some(Boolean);

    return !formHasErrors;
  }

  setValues(values: Values) {
    for (const name in values) {
      const value = values[name];
      const error = this.getFieldError(name, value);

      this.updateFieldState(name, { value, error, dirty: true });
    }

    this.change();
  }

  stain() {
    for (const name in this.fieldsConfig) {
      this.updateFieldState(name, { dirty: true });
    }

    this.change();
  }

  clean() {
    for (const name in this.fieldsConfig) {
      this.updateFieldState(name, { dirty: false });
    }

    this.change();
  }

  reset() {
    for (const name in this.fieldsConfig) {
      const { initialValue } = this.fieldsConfig[name];

      this.updateFieldState(name, {
        value: initialValue,
        error: this.getFieldError(name, initialValue),
        dirty: false,
      });
    }

    this.change();
  }

  getFieldState<Name extends keyof Values>(name: Name) {
    return (this.fieldsState[name] ??
      this.fieldStateInitial) as this extends FormStore<ValidValues>
      ? FormFieldState<ValidValues[Name]>
      : FormFieldState<Values[Name]>;
  }

  setFieldValue(name: keyof Values, value: Values[keyof Values]) {
    const error = this.getFieldError(name, value);

    this.updateFieldState(name, { value, error, dirty: true });

    this.change();
  }

  setFieldError(name: keyof Values, error: string | undefined) {
    this.updateFieldState(name, { error });

    this.change();
  }

  stainField(name: keyof Values) {
    this.updateFieldState(name, { dirty: true });

    this.change();
  }

  resetField(name: keyof Values) {
    const { initialValue } = this.fieldsConfig[name];

    this.updateFieldState(name, {
      value: initialValue,
      error: this.getFieldError(name, initialValue),
    });

    this.change();
  }
}
