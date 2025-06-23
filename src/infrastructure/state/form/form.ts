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

      this.updateFieldValue(name, value);
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
      const { defaultValue } = this.fieldsConfig[name];

      this.updateFieldValue(name, defaultValue);
    }

    this.changeEvent.emit();
  }

  getFieldState<Name extends keyof Values>(name: Name) {
    return this.enabledFields[name];
  }

  setFieldValue(name: keyof Values, value: Values[keyof Values]) {
    this.updateFieldValue(name, value);

    this.changeEvent.emit();
  }

  resetField(name: keyof Values) {
    const { defaultValue } = this.fieldsConfig[name];

    this.updateFieldValue(name, defaultValue);

    this.changeEvent.emit();
  }
}
