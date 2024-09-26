import { split } from "../../underlying/string";

import { RouteParsedPart } from "./route";

export function createRoute<RouteTemplate extends string>(
  routeTemplate: RouteTemplate,
) {
  const routeParsed = parseRouteTemplate(routeTemplate);

  type RouteParamsKeys = RouteParsedParams<typeof routeParsed>[number];

  type RouteParams = {
    [K in RouteParamsKeys]: string | number | boolean;
  };

  interface Route {
    (...params: RouteParamsKeys extends never ? [] : [RouteParams]): string;
    parsed: typeof routeParsed;
  }

  const route = ((...params) => {
    const [routeParams] = params;

    const path = routeParsed
      .filter(({ value }) => value)
      .map(({ type, value }) => {
        if (type === "param") {
          if (!routeParams)
            throw new Error(
              `Missing param "${value}" for route "${routeTemplate}"`,
            );

          return routeParams[value as keyof RouteParams];
        }

        return value;
      })
      .join("/");

    return `/${path}`;
  }) as Route;

  route.parsed = routeParsed;

  return route;
}

function parseRouteTemplate<RouteTemplate extends string>(
  routeTemplate: RouteTemplate,
) {
  const templateParts = split(routeTemplate, "/");

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

type RouteParsed<A extends string[]> = {
  [K in keyof A]: A[K] extends `:${infer P}`
    ? RouteParsedPart<"param", P>
    : RouteParsedPart<"path", A[K]>;
};

type RouteParsedParams<T> = {
  [K in keyof T]: T[K] extends RouteParsedPart
    ? T[K]["type"] extends "param"
      ? T[K]["value"]
      : never
    : never;
};
