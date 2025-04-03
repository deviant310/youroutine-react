import {
  createContext,
  createElement,
  FC,
  PropsWithChildren,
  useContext,
} from "react";

import { Toggle } from "./toggle";
import { useToggleInstance } from "./use-toggle-instance";

const togglesContext = createContext(new Map<string, Toggle>());
const { Provider } = togglesContext;

export const TogglesProvider: FC<PropsWithChildren> = ({ children }) =>
  createElement(Provider, { value: new Map() }, children);

export const useToggle = (toggleKey: string, value?: boolean) => {
  const togglesMap = useContext(togglesContext);

  if (!togglesMap.get(toggleKey)) {
    togglesMap.set(toggleKey, new Toggle(value));
    console.log(togglesMap);
  }

  const toggle = togglesMap.get(toggleKey) as Toggle;

  return useToggleInstance(toggle);
};
