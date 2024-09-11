/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, ChangeEventListener } from "./change-event";
import {
  FormController,
  FormFieldConfig,
  FormFieldError,
  FormValues,
} from "./form-controller";

export class Field<
  Values extends FormValues,
  Name extends keyof Values,
  Config extends FormFieldConfig<Values[Name]> | undefined,
> {
  private static instances = new Map<
    FormController<any>,
    Map<any, Field<any, any, any>>
  >();

  private changeEvent = new ChangeEvent();

  constructor(
    private controller: FormController<Values>,
    public name: Name,
    private config?: Config,
  ) {
    if (!Field.instances.get(controller)?.get(name))
      Field.instances.set(
        controller,
        (
          Field.instances.get(controller) ??
          new Map<Name, Field<Values, Name, Config>>()
        ).set(name, this),
      );

    const instance = Field.instances.get(controller)?.get(name);

    if (instance) {
      instance.onChange = instance.onChange.bind(instance);
      instance.getState = instance.getState.bind(instance);
      instance.destroy = instance.destroy.bind(instance);

      if (config) instance.controller.registerField(name, config);

      return instance;
    }
  }

  onChange(listener: ChangeEventListener) {
    this.changeEvent.addListener(listener);

    return () => this.changeEvent.removeListener(listener);
  }

  setValue(value: Values[Name]) {
    this.controller.setFieldValue(this.name, value);
    this.changeEvent.emit();
  }

  setError(error: FormFieldError) {
    this.controller.setFieldError(this.name, error);
    this.changeEvent.emit();
  }

  getState() {
    return this.controller.getFieldState(this.name);
  }

  destroy() {
    if (this.config) this.controller.destroyField(this.name);
  }
}
