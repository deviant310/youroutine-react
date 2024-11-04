export class Event {
  private listeners = new Set<EventListener>();

  addListener(listener: EventListener) {
    this.listeners.add(listener);
  }

  removeListener(listener: EventListener) {
    this.listeners.delete(listener);
  }

  emit() {
    this.listeners.forEach(listener => listener());
  }
}

export type EventListener = () => void;
