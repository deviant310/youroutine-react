export class FormController<Values extends FormValues> {
  private fieldsConfigs = new Map<
    keyof Values,
    FormFieldConfig<Values[keyof Values]>
  >();

  private formState: FormState<Values> = {
    values: {},
    errors: {},
  };

  private fieldsState: FieldsState<Values> = {};

  private fieldStateInitial: FormFieldState<Values[keyof Values]> = {};

  private updateStatesFromFieldData(
    name: keyof Values,
    data: FormFieldState<Values[keyof Values]>,
  ) {
    const { value, error } = data;

    const formState = { ...this.formState };
    const fieldState = {
      ...(this.fieldsState[name] ?? this.fieldStateInitial),
    };

    const dataHasNewValues = Object.entries(data).some(([key, value]) => {
      return fieldState[key as keyof typeof data] !== value;
    });

    if (!dataHasNewValues) return;

    if ("value" in data) {
      formState.values[name] = value;
      fieldState.value = value;
    }

    if ("error" in data) {
      formState.errors[name] = error;
      fieldState.error = error;
    }

    this.formState = formState;
    this.fieldsState[name] = fieldState;
  }

  getFormState() {
    return this.formState;
  }

  getFieldState<Name extends keyof Values>(name: Name) {
    return (this.fieldsState[name] ?? this.fieldStateInitial) as FormFieldState<
      Values[Name]
    >;
  }

  setFieldValue(name: keyof Values, value: Values[keyof Values]) {
    const config = this.fieldsConfigs.get(name);

    if (!config) return;

    const { validate } = config;

    this.updateStatesFromFieldData(name, { value, error: validate?.(value) });
  }

  setFieldError(name: keyof Values, error: FormFieldError) {
    if (!this.fieldsConfigs.get(name)) return;

    this.updateStatesFromFieldData(name, { error });
  }

  registerField(
    name: keyof Values,
    config: FormFieldConfig<Values[keyof Values]>,
  ) {
    if (this.fieldsConfigs.get(name)) return;

    this.fieldsConfigs.set(name, config);

    const { initialValue, validate } = config;

    this.updateStatesFromFieldData(name, {
      value: initialValue,
      error: validate?.(initialValue),
    });
  }

  destroyField(name: keyof Values) {
    this.fieldsConfigs.delete(name);

    this.updateStatesFromFieldData(name, {
      // eslint-disable-next-line no-undefined
      value: undefined,
      // eslint-disable-next-line no-undefined
      error: undefined,
    });
  }

  reset() {
    this.fieldsConfigs.forEach(({ initialValue, validate }, name) => {
      this.updateStatesFromFieldData(name, {
        value: initialValue,
        error: validate?.(initialValue),
      });
    });
  }
}

export type FormValues = object;

export type FormFieldError = string | undefined;

export interface FormFieldConfig<Value> {
  initialValue: Value;
  validate?(value: Value): FormFieldError;
}

export interface FormState<Values> {
  values: Partial<Values>;
  errors: Partial<Record<keyof Values, FormFieldError>>;
}

export type FieldsState<Values> = Partial<
  Record<keyof Values, FormFieldState<Values[keyof Values]>>
>;

export interface FormFieldState<Value> {
  value?: Value;
  error?: FormFieldError;
}
