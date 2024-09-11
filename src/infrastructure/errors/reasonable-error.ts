export class ReasonableError extends Error {
  constructor(
    message: string,
    public reasons: Array<string>,
  ) {
    super(message);
  }
}
