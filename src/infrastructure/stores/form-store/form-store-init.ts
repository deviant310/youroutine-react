import { Defined, isDefined, PartialMatch } from "~/typescript";

import { ValidationError } from "./validation-error";

export abstract class FormStoreInit<
  FormValues,
  FormValidValues extends FormValues &
    PartialMatch<FormValues, FormValidValues> = FormValues,
> {
  private listeners = new Set<() => void>();

  protected formState: FormState<FormValues>;

  protected readonly fieldsState: Record<
    keyof FormValues,
    FormFieldState<FormValues[keyof FormValues]>
  >;

  protected fieldStateInitial = {};

  constructor(
    protected fieldsConfig: FormFieldsConfig<FormValues, FormValidValues>,
  ) {
    const [formState, fieldsState] = Object.entries(fieldsConfig).reduce(
      ([formState, fieldsState], entries) => {
        const [name, { initialValue }] = entries as [
          keyof FormValues,
          FormFieldConfig<FormValues[keyof FormValues]>,
        ];

        const error = this.getFieldError(name, initialValue);

        formState.values[name] = initialValue;
        formState.errors[name] = error;

        fieldsState[name] = {
          value: initialValue,
          error,
          dirty: false,
        };

        return <const>[formState, fieldsState];
      },
      <const>[
        {
          values: {} as FormValues,
          errors: {} as Record<keyof FormValues, FormFieldError>,
        } satisfies typeof this.formState,
        {} as typeof this.fieldsState,
      ],
    );

    this.formState = formState;
    this.fieldsState = fieldsState;
  }

  protected updateFieldState(
    name: keyof FormValues,
    fieldState: Partial<FormFieldState<FormValues[keyof FormValues]>>,
  ) {
    const { value, error, dirty } = fieldState as FormFieldState<
      FormValues[keyof FormValues]
    >;

    const nextFormState = { ...this.formState };
    const nextFieldState = { ...this.fieldsState[name] };

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

  protected getFieldError(
    name: keyof FormValues,
    value: FormValues[keyof FormValues],
  ) {
    const { validate } = this.fieldsConfig[name];

    try {
      if (isDefined(value)) validate?.(value);
    } catch (error) {
      if (error instanceof ValidationError) return error.message;

      throw error;
    }
  }

  protected change() {
    this.listeners.forEach(listener => listener());
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }
}

export type FormFieldsConfig<Values, ValidValues extends Values = Values> = {
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
