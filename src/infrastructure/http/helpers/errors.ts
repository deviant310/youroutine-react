export class RequestError extends Error {
  constructor(public response: Response) {
    super(response.statusText);
  }
}

export class NotFoundError extends RequestError {}
export class MethodNotAllowedError extends RequestError {}
export class RequestUnauthorizedError extends RequestError {}
