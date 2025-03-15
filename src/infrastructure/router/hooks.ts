import { useRouter } from "./context";
import { Route } from "./route";

export const useNavigator = () => {
  const { navigate } = useRouter();

  return navigate;
};

export const usePathParams = <R>() => {
  type RouteParameters =
    R extends Route<infer Parameters, infer Template> ? Parameters : never;

  const { pathParams } = useRouter();

  return (pathParams ?? {}) as RouteParameters;
};

export const useAnchor = () => {
  const { anchor, setAnchor } = useRouter();

  return <const>[anchor, setAnchor];
};
