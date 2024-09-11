import { ChangeEvent, ChangeEventListener } from "./change-event";
import { FormController, FormValues } from "./form-controller";

export class Form<Values extends FormValues> {
  private changeEvent = new ChangeEvent();

  constructor(private controller: FormController<Values>) {
    this.onChange = this.onChange.bind(this);
    this.getState = this.getState.bind(this);
  }

  get isValid() {
    const { errors } = this.controller.getFormState();
    const formHasErrors = Object.keys(errors).some(Boolean);

    return !formHasErrors;
  }

  onChange(listener: ChangeEventListener) {
    this.changeEvent.addListener(listener);

    return () => this.changeEvent.removeListener(listener);
  }

  setValues(values: Values) {
    for (const name in values)
      this.controller.setFieldValue(name, values[name]);

    this.changeEvent.emit();
  }

  reset() {
    this.controller.reset();
    this.changeEvent.emit();
  }

  getState() {
    return this.controller.getFormState();
  }
}
