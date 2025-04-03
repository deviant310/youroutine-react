/* eslint-disable @typescript-eslint/no-explicit-any */
import { Split, split } from "~/typescript";

export function Route<
  RouteParameters extends {
    [K in RouteParam<RouteParsed<Split<RouteTemplate, "/">>>]: string;
  },
  RouteTemplate extends string = string,
>(routeTemplate: RouteTemplate) {
  type Builder = { pattern: RegExp } & (keyof RouteParameters extends never
    ? () => string
    : (parameters: RouteParameters) => string);

  const templateParts = split(routeTemplate, "/");

  const parsed = templateParts.map(part => {
    const routeParamParsedPart: RouteParsedPart = {
      type: "param",
      value: part.slice(part.lastIndexOf(":") + 1),
    };

    const routePathParsedPart: RouteParsedPart = {
      type: "path",
      value: part,
    };

    return part.startsWith(":") ? routeParamParsedPart : routePathParsedPart;
  }) as RouteParsed<typeof templateParts>;

  const pattern = new RegExp(
    parsed
      .filter(({ value }) => value)
      .map(({ type, value }) => {
        if (type === "param")
          return new RegExp(`/(?<${value}>[A-Za-z0-9\\-]+)/?`).source;

        return new RegExp(`/?${value}/?`).source;
      })
      .join("") + "$",
  );

  const builder: Builder = (...params: any[]) => {
    const [routeParams] = params;

    const path = parsed
      .filter(({ value }) => value)
      .map(({ type, value }) => {
        if (type === "param") {
          if (!routeParams)
            throw new Error(
              `Missing param "${value}" for route "${routeTemplate}"`,
            );

          return routeParams[value as keyof RouteParameters];
        }

        return value;
      })
      .join("/");

    return `/${path}`;
  };

  builder.pattern = pattern;

  return builder;
}

export interface RouteBuilder {
  pattern: RegExp;
  (...args: Array<any>): string;
}

export interface RouteParsedPart<
  Type extends RoutePartType = RoutePartType,
  Value extends string = string,
> {
  type: Type;
  value: Value;
}

export type RoutePartType = string;

type RouteParsed<A extends string[]> = {
  [K in keyof A]: A[K] extends `:${infer P}`
    ? RouteParsedPart<"param", P>
    : RouteParsedPart<"path", A[K]>;
};

type RouteParam<T> =
  T extends RouteParsed<any>
    ? {
        [K in keyof T]: T[K] extends RouteParsedPart
          ? T[K]["type"] extends "param"
            ? T[K]["value"]
            : never
          : never;
      }[number]
    : never;
