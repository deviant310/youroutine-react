/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestPayload, ResponseType } from "../helpers";

export const createRequest: RequestCreator = options => {
  const { headers, method, url, responseType = "json" } = options;

  return {
    request: new Request(url, {
      ...(("body" satisfies keyof RequestConfigWithBody) in options && {
        body: JSON.stringify(options.body),
      }),
      ...(headers && { headers: new Headers(headers) }),
      method,
    }),
    responseType,
  };
};

export interface RequestCreator {
  <Data>(options: RequestConfigWithoutBody): RequestPayload<Data>;
  <Data>(options: RequestConfigWithBody): RequestPayload<Data>;
}

export interface RequestConfigBase {
  responseType?: ResponseType;
  headers?: Record<string, string>;
  url: URL;
}

export interface RequestConfigWithoutBody extends RequestConfigBase {
  method: "GET" | "HEAD";
}

export interface RequestConfigWithBody extends RequestConfigBase {
  body?: Record<string, any>;
  method: "POST" | "PUT" | "DELETE";
}
