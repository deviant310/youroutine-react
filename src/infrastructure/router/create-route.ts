import { split } from "~/utils/string";

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
        if (type === "param" && routeParams)
          return routeParams[value as keyof RouteParams];

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

  return templateParts.map(part =>
    part.startsWith(":")
      ? { type: "param", value: part.slice(part.lastIndexOf(":") + 1) }
      : { type: "path", value: part },
  ) as RouteParsed<typeof templateParts>;
}

type RouteParsed<A extends string[]> = {
  [K in keyof A]: A[K] extends `:${infer P}`
    ? { type: "param"; value: P }
    : { type: "path"; value: A[K] };
};

type RouteParsedParams<T> = {
  [K in keyof T]: T[K] extends { type: "path" | "param"; value: string }
    ? T[K]["type"] extends "param"
      ? T[K]["value"]
      : never
    : never;
};
