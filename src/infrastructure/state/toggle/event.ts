export class Event {
  private listeners = new Set<() => void>();

  emit() {
    this.listeners.forEach(listener => listener());
  }

  addListener(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }
}
