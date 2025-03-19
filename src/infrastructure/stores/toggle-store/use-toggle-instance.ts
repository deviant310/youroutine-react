import { useCallback, useSyncExternalStore } from "react";

import { Toggle } from "./toggle";

export const useToggleInstance = (toggle: Toggle) => {
  const isOn = useSyncExternalStore(
    notify => toggle.onChange(notify),
    () => toggle.isOn,
  );

  const turnOn = useCallback(() => toggle.turnOn(), [toggle]);
  const turnOff = useCallback(() => toggle.turnOff(), [toggle]);

  return { isOn, turnOn, turnOff };
};
