import { useRouter } from "./context";
import { Route } from "./route";

export const usePathParams = <R>() => {
  type RouteParameters =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    R extends Route<infer Parameters, infer _Template> ? Parameters : never;

  const { pathParams } = useRouter();

  return (pathParams ?? {}) as RouteParameters;
};
