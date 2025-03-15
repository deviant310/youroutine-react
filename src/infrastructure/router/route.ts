/* eslint-disable @typescript-eslint/no-explicit-any */
import { Split, split } from "~/typescript";

export class Route<
  RouteParameters extends {
    [K in RouteParam<RouteParsed<Split<RouteTemplate, "/">>>]: string;
  },
  RouteTemplate extends string = string,
> {
  constructor(private routeTemplate: RouteTemplate) {}

  private get parsed() {
    const templateParts = split(this.routeTemplate, "/");

    return templateParts.map(part => {
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
  }

  get pattern() {
    return new RegExp(
      this.parsed
        .filter(({ value }) => value)
        .map(({ type, value }) => {
          if (type === "param")
            return new RegExp(`/(?<${value}>[A-Za-z0-9\\-]+)/?`).source;

          return new RegExp(`/?${value}/?`).source;
        })
        .join("") + "$",
    );
  }

  build(
    ...params: keyof RouteParameters extends never ? [] : [RouteParameters]
  ) {
    const [routeParams] = params;

    const path = this.parsed
      .filter(({ value }) => value)
      .map(({ type, value }) => {
        if (type === "param") {
          if (!routeParams)
            throw new Error(
              `Missing param "${value}" for route "${this.routeTemplate}"`,
            );

          return routeParams[value as keyof RouteParameters];
        }

        return value;
      })
      .join("/");

    return `/${path}`;
  }
}

export interface RouteAbstract {
  pattern: RegExp;
  build(...args: Array<any>): string;
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
