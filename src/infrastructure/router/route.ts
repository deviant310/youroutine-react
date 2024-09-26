/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RouteAbstract {
  (...params: Array<any>): string;
  parsed: Array<RouteParsedPart>;
}

export interface RouteParsedPart<
  Type extends RoutePartType = RoutePartType,
  Value extends string = string,
> {
  type: Type;
  value: Value;
}

export type RoutePartType = "param" | "path";
