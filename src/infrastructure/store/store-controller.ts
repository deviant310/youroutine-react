export class StoreController<Value> {
  private value: Value;

  constructor(private initialValue: Value) {
    this.value = initialValue;
  }

  getValue() {
    return this.value;
  }

  setValue(value: Value) {
    this.value = value;
  }

  reset() {
    this.value = this.initialValue;
  }
}
