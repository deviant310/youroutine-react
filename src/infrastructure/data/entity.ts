export abstract class Entity<Payload> {
  constructor(public $payload: Payload) {}

  abstract toString(): string;
}
