export class StoreController<Value> {
  private initialValue?: Value;
  private value?: Value;

  getValue() {
    return this.value;
  }

  setValue(value: Value) {
    if (typeof this.initialValue === "undefined") return;

    this.value = value;
  }

  setInitialValue(value: Value) {
    if (typeof this.initialValue !== "undefined") return;

    this.initialValue = value;
    this.value = value;
  }

  reset() {
    if (typeof this.initialValue !== "undefined")
      this.value = this.initialValue;
  }
}
