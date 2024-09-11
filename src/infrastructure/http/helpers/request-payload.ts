/* eslint-disable @typescript-eslint/no-unused-vars */
export type RequestPayload<Data> = {
  responseType: ResponseType;
  request: Request;
};

export type ResponseType = Extract<
  keyof Body,
  "json" | "text" | "arrayBuffer" | "blob" | "formData"
>;
