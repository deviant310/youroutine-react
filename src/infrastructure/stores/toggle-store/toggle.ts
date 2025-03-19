export class Toggle {
  private listeners = new Set<() => void>();

  constructor(public isOn: boolean = false) {}

  private emitUpdate() {
    this.listeners.forEach(listener => listener());
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  turnOn() {
    this.isOn = true;

    this.emitUpdate();
  }

  turnOff() {
    this.isOn = false;

    this.emitUpdate();
  }
}
