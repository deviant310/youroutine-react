// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DTO<Key extends keyof any, Value> {
  constructor(private record: Record<Key, Value>) {
    this.getValue = this.getValue.bind(this);
  }

  keys() {
    return Object.keys(this.record) as Array<Key>;
  }

  getValue(key: Key) {
    return this.record[key];
  }
}
