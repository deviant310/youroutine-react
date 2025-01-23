export class PrimitiveStore<Value> {
  private value: Value;
  private listeners = new Set<() => void>();

  constructor(public initialValue: Value) {
    this.value = initialValue;
  }

  private change() {
    this.listeners.forEach(listener => listener());
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  getValue() {
    return this.value;
  }

  setValue(value: Value) {
    this.value = value;

    this.change();
  }

  reset() {
    this.value = this.initialValue;

    this.change();
  }
}
