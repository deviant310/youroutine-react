import { ChangeEvent, ChangeEventListener } from "./change-event";
import { StoreController } from "./store-controller";

export class Store<Value, InitialValue extends Value | undefined> {
  private changeEvent = new ChangeEvent();

  constructor(
    private controller: StoreController<Value>,
    initialValue?: InitialValue,
  ) {
    this.onChange = this.onChange.bind(this);
    this.getValue = this.getValue.bind(this);

    if (typeof initialValue !== "undefined")
      this.controller.setInitialValue(initialValue);
  }

  onChange(listener: ChangeEventListener) {
    this.changeEvent.addListener(listener);

    return () => this.changeEvent.removeListener(listener);
  }

  getValue() {
    return this.controller.getValue();
  }

  setValue(value: Value) {
    this.controller.setValue(value);
    this.changeEvent.emit();
  }

  reset() {
    this.controller.reset();
    this.changeEvent.emit();
  }
}
