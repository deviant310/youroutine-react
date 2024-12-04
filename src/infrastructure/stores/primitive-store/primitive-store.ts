import { Event, EventListener } from "~/typescript";

export class PrimitiveStore<Value> {
  private value: Value;
  private changeEvent = new Event();

  constructor(public initialValue: Value) {
    this.value = initialValue;
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

  setValueOn() {
    this.value = true as Value;

    this.changeEvent.emit();
  }

  setValueOff() {
    this.value = false as Value;

    this.changeEvent.emit();
  }

  reset() {
    this.value = this.initialValue;

    this.changeEvent.emit();
  }
}
