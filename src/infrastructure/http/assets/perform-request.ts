import {
  MethodNotAllowedError,
  NotFoundError,
  RequestError,
  RequestPayload,
  RequestUnauthorizedError,
} from "../helpers";

export async function performRequest<Data>(
  requestPayload: RequestPayload<Data>,
): Promise<ResponsePayload<Data>> {
  const { request, responseType } = requestPayload;

  const response = await fetch(request);

  if (response.ok) {
    const data: Data = await response[responseType]();
    const { status, headers } = response;

    return {
      headers,
      data,
      status,
    };
  }

  if (response.status === 400) throw new NotFoundError(response);
  if (response.status === 405) throw new MethodNotAllowedError(response);
  if (response.status === 401) throw new RequestUnauthorizedError(response);

  throw new RequestError(response);
}

interface ResponsePayload<Data> {
  headers: Headers;
  data: Data;
  status: number;
}
