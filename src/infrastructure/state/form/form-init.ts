/* eslint-disable @typescript-eslint/no-explicit-any */
import { Event } from "./event";
import { FormValidationError } from "./form-validation-error";

export abstract class FormInit<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
  Conditionals extends keyof Values = never,
> {
  protected changeEvent = new Event();

  private fields: FormFields<Values, ValidValues>;
  protected formState: FormState<Values, ValidValues>;
  protected fieldsState: FormFieldsState<Values, ValidValues>;

  constructor(
    protected fieldsConfig: FormFieldsConfig<Values, ValidValues, Conditionals>,
  ) {
    this.fields = Object.entries(fieldsConfig).reduce(
      (fields, entry) => {
        const [name, { defaultValue: value }] = entry as [
          keyof Values,
          (typeof fieldsConfig)[keyof Values],
        ];

        const [validValue, error] = this.validateFieldValue(name, value);

        fields[name] = { value, validValue, error };

        return fields;
      },
      {} as typeof this.fields,
    );

    this.fieldsState = this.setFieldsState();
    this.formState = this.setFormState();

    this.setFieldsState = this.setFieldsState.bind(this);
    this.setFormState = this.setFormState.bind(this);

    this.changeEvent.addListener(this.setFieldsState);
    this.changeEvent.addListener(this.setFormState);
  }

  protected updateFieldState(
    name: keyof Values,
    fieldState: Partial<FormFieldState<Values[keyof Values]>>,
  ) {
    const { value, error } = fieldState as FormFieldState<Values[keyof Values]>;

    const nextField = { ...this.fields[name] };

    const fieldHasUpdates = Object.entries(fieldState).some(
      ([key, value]) => nextField[key as keyof typeof fieldState] !== value,
    );

    if (!fieldHasUpdates) return;

    if ("value" in fieldState) nextField.value = value;
    if ("error" in fieldState) nextField.error = error;
    //if ("dirty" in fieldState) nextFieldState.dirty = dirty;

    this.fields[name] = nextField;
  }

  private setFieldsState() {
    return (this.fieldsState = Object.entries(this.fields).reduce(
      (fieldsState, entry, index, entries) => {
        type Entry = [keyof Values, (typeof this.fields)[keyof Values]];

        const [name, { value, validValue, error }] = entry as Entry;
        const { enabled } = this.fieldsConfig[name];

        const values = (entries as Array<Entry>).reduce(
          (values, [name, { value }]) => ({
            ...values,
            ...{ [name]: value },
          }),
          {} as Values,
        );

        const fieldEnabled = enabled?.(values) ?? true;

        if (fieldEnabled)
          fieldsState[name] = {
            value,
            validValue,
            error,
          };

        return fieldsState;
      },
      {} as typeof this.fieldsState,
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
      fields: this.fieldsState,
      validValues,
    });
  }

  protected validateFieldValue(
    name: keyof Values,
    value: Values[keyof Values],
  ) {
    const { validate } = this.fieldsConfig[name];

    let validValue: ValidValues[keyof Values] | undefined;
    let errorMessage: FormErrorMessage;

    try {
      validValue = typeof validate === "function" ? validate(value) : value;
    } catch (error) {
      if (error instanceof FormValidationError) errorMessage = error.message;
      else throw error;
    }

    return <const>[validValue, errorMessage];
  }

  onChange(callback: () => void) {
    return this.changeEvent.addListener(callback);
  }

  get isValid() {
    for (const name in this.fieldsState) {
      if (!this.fieldsState[name]) continue;

      const { error } = this.fieldsState[name];

      if (error) return false;
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
        validate?(value: Values[Name]): Values[Name];
      }
    : {
        validate(value: Values[Name]): ValidValues[Name];
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
  validValue: ValidValue | undefined;
  error: FormErrorMessage;
}

type FormState<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
> = {
  fields: FormFieldsState<Values, ValidValues>;
  validValues: ValidValues | null;
};

export type FormFieldsState<
  Values extends Record<string, any>,
  ValidValues extends Values = Values,
> = {
  [Name in keyof Values]:
    | FormFieldState<Values[Name], ValidValues[Name]>
    | undefined;
};

export interface FormFieldState<
  Value = unknown,
  ValidValue extends Value = Value,
> extends FormField<Value, ValidValue> {
  validValue: ValidValue | undefined;
}

export type FormErrorMessage = string | undefined;
