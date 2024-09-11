export class RequestError extends Error {
  constructor(
    message: string,
    public response: Response,
  ) {
    super(message);
  }
}

export class RequestUnauthorizedError extends RequestError {}
