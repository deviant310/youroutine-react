/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  createElement,
  memo,
  useMemo,
  useCallback,
  useState,
  FC,
  useContext,
  useEffect,
} from "react";

const context = createContext<ContextValue>({} as ContextValue);
const { Provider } = context;

export const RouterProvider = memo<RouterProviderProps>(({ routesEntries }) => {
  const [locationPathname, setLocationPathname] = useState(
    window.location.pathname,
  );

  const componentPatternToComponentMap = useMemo(() => {
    const map = new Map<RegExp, FC>();

    for (const [route, component] of routesEntries) {
      const pathPattern = new RegExp(
        route.parsed
          .filter(({ value }) => value)
          .map(({ type, value }) => {
            if (type === "param")
              return new RegExp(`/(?<${value}>\\w+)/?`).source;

            return new RegExp(`/?${value}/?`).source;
          })
          .join("") + "$",
      );

      map.set(pathPattern, component);
    }

    return map;
  }, [routesEntries]);

  const component = useMemo(() => {
    for (const [
      componentPattern,
      component,
    ] of componentPatternToComponentMap) {
      if (componentPattern.test(locationPathname)) return component;
    }

    return NotFound;
  }, [componentPatternToComponentMap, locationPathname]);

  const navigate = useCallback<ContextValue["navigate"]>((route, ...params) => {
    const [routeParams] = params;
    const pathname = route(routeParams);

    history.pushState(routeParams ?? null, "", pathname);

    setLocationPathname(pathname);
  }, []);

  const getRouteParams = useCallback<ContextValue["getRouteParams"]>(
    route => {
      const pathname = route(history.state);

      if (locationPathname !== pathname) {
        throw new Error(
          `Cannot use params of route "${pathname}" in current location`,
        );
      }

      return history.state;
    },
    [locationPathname],
  );

  const value = useMemo(
    () => ({ navigate, getRouteParams }),
    [getRouteParams, navigate],
  );

  const onPopState = useCallback(() => {
    setLocationPathname(window.location.pathname);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
  }, [onPopState]);

  return createElement(Provider, { value }, createElement(component));
});

export const useRouter = () => useContext(context);

const NotFound: FC = () => {
  return "Not found";
};

interface ContextValue {
  navigate<Route extends RouteAbstract>(
    route: Route,
    ...params: Parameters<Route>
  ): void;

  getRouteParams<Route extends RouteAbstract>(
    route: Route,
  ): Parameters<Route>[0];
}

interface RouteAbstract {
  (...params: Array<any>): string;
  parsed: Array<{ type: "param" | "path"; value: string }>;
}

interface RouterProviderProps {
  routesEntries: Array<readonly [RouteAbstract, FC]>;
}
