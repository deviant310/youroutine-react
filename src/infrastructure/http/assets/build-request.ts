/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestPayload, ResponseType } from "../helpers";

export const buildRequest: RequestBuilder = options => {
  const { headers, method, url, responseType = "json" } = options;

  return {
    request: new Request(url, {
      ...(("data" satisfies keyof RequestConfigWithData) in options && {
        body: JSON.stringify(options.data),
      }),
      ...(headers && { headers: new Headers(headers) }),
      method,
    }),
    responseType,
  };
};

export interface RequestBuilder {
  <Data>(options: RequestConfigWithoutData): RequestPayload<Data>;
  <Data>(options: RequestConfigWithData): RequestPayload<Data>;
}

export interface RequestConfigBase {
  responseType?: ResponseType;
  headers?: Record<string, string>;
  url: URL;
}

export interface RequestConfigWithoutData extends RequestConfigBase {
  method: "GET" | "HEAD";
}

export interface RequestConfigWithData extends RequestConfigBase {
  data?: Record<string, any>;
  method: "POST" | "PUT" | "DELETE";
}
