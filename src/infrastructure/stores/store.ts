export abstract class Store {
  private listeners = new Set<() => void>();

  protected change() {
    this.listeners.forEach(listener => listener());
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }
}
