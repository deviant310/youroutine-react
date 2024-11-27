import { Event, EventListener } from "~/typescript";

export class PrimitiveStore<Value> {
  private value: Value;
  private changeEvent = new Event();

  constructor(private initialValue: Value) {
    this.value = initialValue;

    this.onChange = this.onChange.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  onChange(listener: EventListener) {
    this.changeEvent.addListener(listener);

    return () => this.changeEvent.removeListener(listener);
  }

  getValue() {
    return this.value;
  }

  setValue(value: Value) {
    this.value = value;

    this.changeEvent.emit();
  }

  reset() {
    this.value = this.initialValue;

    this.changeEvent.emit();
  }
}
