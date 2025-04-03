import { useRouter } from "./context";
import { RouteBuilder } from "./route";

export const usePathParams = <Builder extends RouteBuilder>() => {
  const { pathParams } = useRouter();

  return (pathParams ?? {}) as Parameters<Builder>[0];
};
