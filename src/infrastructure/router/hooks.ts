import { useRouter } from "./context";
import { RouteBuilder } from "./route";

export const usePathParams = <Builder extends RouteBuilder>() => {
  const { pathParams } = useRouter();

  return (pathParams ?? {}) as Parameters<Builder>[0];
};

export const useNavigator = () => {
  const { navigate } = useRouter();

  return navigate;
};

export const useAnchor = () => {
  const { anchor, setAnchor } = useRouter();

  return <const>[anchor, setAnchor];
};
