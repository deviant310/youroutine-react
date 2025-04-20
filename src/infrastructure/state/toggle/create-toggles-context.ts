import {
  createContext,
  createElement,
  FC,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import { Toggle } from "./toggle";
import { useToggleInstance } from "./use-toggle-instance";

export const createTogglesContext = () => {
  const togglesContext = createContext<Map<string, Toggle> | null>(null);
  const { Provider } = togglesContext;

  const TogglesProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const value = useMemo(() => new Map(), []);

    return createElement(Provider, { value }, children);
  };

  const useToggle = (toggleKey: string, isOnInitial?: boolean) => {
    const toggles = useContext(togglesContext);

    if (!toggles)
      throw new Error("useToggle must be used within a TogglesProvider");

    if (!toggles.has(toggleKey))
      toggles.set(toggleKey, new Toggle(isOnInitial));

    const toggle = toggles.get(toggleKey);

    if (!toggle) throw null;

    return useToggleInstance(toggle);
  };

  return { TogglesProvider, useToggle };
};
