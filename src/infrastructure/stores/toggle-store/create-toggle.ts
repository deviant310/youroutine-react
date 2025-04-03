import { Toggle } from "./toggle";
import { useToggleInstance } from "./use-toggle-instance";

export const createToggle = (value?: boolean) => {
  const toggle = new Toggle(value);

  const useToggle = () => useToggleInstance(toggle);

  return { useToggle };
};
