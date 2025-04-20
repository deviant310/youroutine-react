/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormInit } from "./form-init";

export class Form<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  ConditionalFields extends keyof Values = never,
> extends FormInit<Values, ValidValues, ConditionalFields> {
  getState() {
    return this.formState;
  }

  setValues(values: Values) {
    for (const name in values) {
      const value = values[name];
      const [validValue, error] = this.validateFieldValue(name, value);

      this.updateFieldState(name, { value, validValue, error });
    }

    this.changeEvent.emit();
  }

  // TODO refactor to touch
  /* stain() {
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
  } */

  reset() {
    for (const name in this.fieldsConfig) {
      const { defaultValue: value } = this.fieldsConfig[name];

      const [validValue, error] = this.validateFieldValue(name, value);

      this.updateFieldState(name, { value, validValue, error });
    }

    this.changeEvent.emit();
  }

  getFieldState<Name extends keyof Values>(name: Name) {
    return this.fieldsState[name];
  }

  setFieldValue(name: keyof Values, value: Values[keyof Values]) {
    const [validValue, error] = this.validateFieldValue(name, value);

    this.updateFieldState(name, { value, validValue, error });

    this.changeEvent.emit();
  }

  setFieldError(name: keyof Values, error: string | undefined) {
    this.updateFieldState(name, { error });

    this.changeEvent.emit();
  }

  /* stainField(name: keyof Values) {
    this.updateFieldState(name, { dirty: true });

    this.change();
  } */

  resetField(name: keyof Values) {
    const { defaultValue: value } = this.fieldsConfig[name];

    const [validValue, error] = this.validateFieldValue(name, value);

    this.updateFieldState(name, { value, validValue, error });

    this.changeEvent.emit();
  }
}
