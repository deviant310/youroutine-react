import {
  Defined,
  Event,
  EventListener,
  isDefined,
  PartialDiff,
} from "~/typescript";

import { ValidationError } from "./validation-error";

export class FormStore<
  Values,
  ValidValues extends Values & PartialDiff<Values, ValidValues> = Values,
> {
  private changeEvent = new Event();

  private formState: FormState<Values>;

  private readonly fieldsState: Record<
    keyof Values,
    FormFieldState<Values[keyof Values]>
  >;

  private fieldStateInitial = {};

  constructor(private fieldsConfig: FormFieldsConfig<Values, ValidValues>) {
    this.formState = Object.entries(fieldsConfig).reduce(
      (formState, entries) => {
        const [name, { initialValue }] = entries as [
          keyof Values,
          FormFieldConfig<Values[keyof Values]>,
        ];

        formState.values[name] = initialValue;
        formState.errors[name] = this.getFieldError(name, initialValue);

        return formState;
      },
      {
        values: {} as Values,
        errors: {} as Record<keyof Values, FormFieldError>,
      } satisfies typeof this.formState,
    );

    this.fieldsState = Object.entries(fieldsConfig).reduce(
      (fieldsState, entries) => {
        const [name, { initialValue }] = entries as [
          keyof Values,
          FormFieldConfig<Values[keyof Values]>,
        ];

        fieldsState[name] = {
          value: initialValue,
          error: this.getFieldError(name, initialValue),
          dirty: false,
        };

        return fieldsState;
      },
      {} as typeof this.fieldsState,
    );
  }

  private getFieldError(name: keyof Values, value: Values[keyof Values]) {
    const { validate } = this.fieldsConfig[name];

    try {
      if (isDefined(value)) validate?.(value);
    } catch (error) {
      if (error instanceof ValidationError) return error.message;

      throw error;
    }
  }

  private updateFieldState(
    name: keyof Values,
    fieldState: Partial<FormFieldState<Values[keyof Values]>>,
  ) {
    const { value, error, dirty } = fieldState as FormFieldState<
      Values[keyof Values]
    >;

    const nextFormState = { ...this.formState };
    const nextFieldState = { ...this.fieldsState[name] };

    if (!nextFieldState) return;

    const fieldHasUpdates = Object.entries(fieldState).some(
      ([key, value]) =>
        nextFieldState[key as keyof typeof fieldState] !== value,
    );

    if (!fieldHasUpdates) return;

    if ("value" in fieldState) {
      nextFormState.values[name] = value;
      nextFieldState.value = value;
    }

    if ("error" in fieldState) {
      nextFormState.errors[name] = error;
      nextFieldState.error = error;
    }

    if ("dirty" in fieldState) {
      nextFieldState.dirty = dirty;
    }

    this.formState = nextFormState;
    this.fieldsState[name] = nextFieldState;
  }

  valid(): this is FormStore<ValidValues> {
    const formHasErrors = Object.values(this.formState.errors).some(Boolean);

    return !formHasErrors;
  }

  onChange(listener: EventListener) {
    this.changeEvent.addListener(listener);

    return () => this.changeEvent.removeListener(listener);
  }

  get state() {
    return this.formState;
  }

  getFieldState<Name extends keyof Values>(name: Name) {
    return (this.fieldsState[name] ?? this.fieldStateInitial) as FormFieldState<
      Values[Name]
    >;
  }

  setValues(values: Values) {
    for (const name in values) {
      const value = values[name];
      const error = this.getFieldError(name, value);

      this.updateFieldState(name, { value, error, dirty: true });
    }

    this.changeEvent.emit();
  }

  stain() {
    for (const name in this.fieldsConfig) {
      this.updateFieldState(name, { dirty: true });
    }

    this.changeEvent.emit();
  }

  clean() {
    for (const name in this.fieldsConfig) {
      this.updateFieldState(name, { dirty: false });
    }

    this.changeEvent.emit();
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

    this.changeEvent.emit();
  }

  setFieldValue(name: keyof Values, value: Values[keyof Values]) {
    const error = this.getFieldError(name, value);

    this.updateFieldState(name, { value, error, dirty: true });

    this.changeEvent.emit();
  }

  setFieldError(name: keyof Values, error: string | undefined) {
    this.updateFieldState(name, { error });

    this.changeEvent.emit();
  }

  stainField(name: keyof Values) {
    this.updateFieldState(name, { dirty: true });

    this.changeEvent.emit();
  }

  resetField(name: keyof Values) {
    const { initialValue } = this.fieldsConfig[name];

    this.updateFieldState(name, {
      value: initialValue,
      error: this.getFieldError(name, initialValue),
      dirty: false,
    });

    this.changeEvent.emit();
  }
}

export type FormFieldsConfig<Values, ValidValues extends Values> = {
  [Key in keyof Values]-?: {
    [K in Key as `initialValue`]: Values[K];
  } & (Values[Key] extends ValidValues[Key]
    ? Pick<FormFieldConfig<Values[Key]>, "validate">
    : Required<
        Pick<FormFieldConfig<Values[Key], ValidValues[Key]>, "validate">
      >);
};

export type FormFieldError = string | undefined;

export interface FormFieldConfig<Value, ValidValue extends Value = Value> {
  initialValue: Value;
  validate?(value: Defined<Value>): ValidValue;
}

export interface FormState<Values> {
  values: Values;
  errors: Record<keyof Values, FormFieldError>;
}

export interface FormFieldState<Value> {
  value: Value;
  error: FormFieldError;
  dirty: boolean;
}
