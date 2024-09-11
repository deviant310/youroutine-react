export class ChangeEvent {
  private listeners = new Set<ChangeEventListener>();

  addListener(listener: ChangeEventListener) {
    this.listeners.add(listener);
  }

  removeListener(listener: ChangeEventListener) {
    this.listeners.delete(listener);
  }

  emit() {
    this.listeners.forEach(listener => listener());
  }
}

export type ChangeEventListener = () => void;
