import { Event } from "./event";

export class Toggle {
  public isOn: boolean;

  private changeEvent = new Event();

  constructor(public isOnInitial: boolean = false) {
    this.isOn = isOnInitial;
  }

  onChange(callback: () => void) {
    return this.changeEvent.addListener(callback);
  }

  turnOn() {
    this.isOn = true;

    this.changeEvent.emit();
  }

  turnOff() {
    this.isOn = false;

    this.changeEvent.emit();
  }

  flip() {
    this.isOn = !this.isOn;

    this.changeEvent.emit();
  }

  reset() {
    this.isOn = this.isOnInitial;

    this.changeEvent.emit();
  }
}
