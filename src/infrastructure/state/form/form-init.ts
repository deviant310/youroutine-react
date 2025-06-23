/* eslint-disable @typescript-eslint/no-explicit-any */
import { Event } from "./event";
import { FormValidationError } from "./form-validation-error";

export abstract class FormInit<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  Conditionals extends keyof Values = never,
> {
  protected changeEvent = new Event();

  protected formState: FormState<Values, ValidValues>;
  protected fields: FormFields<Values, ValidValues>;
  protected enabledFields: Partial<FormFields<Values, ValidValues>>;

  constructor(
    protected fieldsConfig: FormFieldsConfig<Values, ValidValues, Conditionals>,
  ) {
    this.fields = Object.entries(fieldsConfig).reduce(
      (fields, entry) => {
        const [name, { defaultValue: value }] = entry as [
          keyof Values,
          (typeof fieldsConfig)[keyof Values],
        ];

        fields[name] = { value, isValid: true };

        return fields;
      },
      {} as typeof this.fields,
    );

    this.validateFields();
    this.enabledFields = this.setEnabledFields();
    this.formState = this.setFormState();
  }

  protected updateFieldValue(name: keyof Values, value: Values[keyof Values]) {
    const field = { ...this.fields[name] };

    if (field.value === value) return;

    field.value = value;

    this.fields[name] = field;

    this.validateFields();
    this.setEnabledFields();
    this.setFormState();
  }

  private setEnabledFields() {
    return (this.enabledFields = Object.entries(this.fields).reduce(
      (enabledFields, entry, index, entries) => {
        type Entry = [keyof Values, (typeof this.fields)[keyof Values]];

        const [name, field] = entry as Entry;
        const { enabled } = this.fieldsConfig[name];

        const values = entries.reduce(
          (values, [name, { value }]) => ({
            ...values,
            ...{ [name]: value },
          }),
          {} as Values,
        );

        const fieldEnabled = enabled?.(values) ?? true;

        if (fieldEnabled) enabledFields[name] = field;

        return enabledFields;
      },
      {} as typeof this.enabledFields,
    ));
  }

  private setFormState() {
    const validValues = this.isValid
      ? Object.entries(this.fields).reduce(
          (values, [name, { value }]) => ({ ...values, ...{ [name]: value } }),
          {} as ValidValues,
        )
      : null;

    return (this.formState = {
      fields: this.enabledFields,
      validValues,
    });
  }

  protected validateFields() {
    const values = Object.entries(this.fields).reduce(
      (values, [name, { value }]) => ({ ...values, ...{ [name]: value } }),
      {} as Values,
    );

    Object.entries(values).forEach(
      ([name, value]: [keyof Values, Values[keyof Values]]) => {
        const { validate } = this.fieldsConfig[name];

        let validValue: ValidValues[keyof Values] | undefined;
        let isValid = true;

        try {
          validValue =
            typeof validate === "function" ? validate(value, values) : value;
        } catch (thrownError) {
          if (thrownError instanceof FormValidationError) isValid = false;
          else throw thrownError;
        }

        this.fields[name] = { value, validValue, isValid };
      },
    );
  }

  onChange(callback: () => void) {
    return this.changeEvent.addListener(callback);
  }

  get isValid() {
    for (const name in this.enabledFields) {
      if (!this.enabledFields[name]) continue;

      const { isValid } = this.enabledFields[name];

      if (!isValid) return false;
    }

    return true;
  }
}

export type FormFieldsConfig<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  ConditionalFields extends keyof Values = never,
> = {
  [Name in keyof Values]-?: {
    [Key in Name as "defaultValue"]: Values[Key];
  } & (Values[Name] extends ValidValues[Name]
    ? {
        validate?(value: Values[Name], values: Values): Values[Name];
      }
    : {
        validate(value: Values[Name], values: Values): ValidValues[Name];
      }) &
    (Name extends ConditionalFields
      ? {
          enabled(values: Values): boolean;
        }
      : {
          enabled?: never;
        });
};

type FormFields<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
> = {
  [Name in keyof Values]: FormField<Values[Name], ValidValues[Name]>;
};

export interface FormField<Value = unknown, ValidValue extends Value = Value> {
  value: Value;
  validValue?: ValidValue;
  isValid: boolean;
}

type FormState<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
> = {
  fields: Partial<FormFields<Values, ValidValues>>;
  validValues: ValidValues | null;
};
