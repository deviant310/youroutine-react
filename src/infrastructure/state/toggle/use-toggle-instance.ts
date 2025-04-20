import { useCallback, useSyncExternalStore } from "react";

import { Toggle } from "./toggle";

export const useToggleInstance = (toggle: Toggle) => {
  const isOn = useSyncExternalStore(
    dispatch => toggle.onChange(dispatch),
    () => toggle.isOn,
  );

  const turnOn = useCallback(() => toggle.turnOn(), [toggle]);
  const turnOff = useCallback(() => toggle.turnOff(), [toggle]);
  const flip = useCallback(() => toggle.flip(), [toggle]);
  const reset = useCallback(() => toggle.reset(), [toggle]);

  return { isOn, turnOn, turnOff, flip, reset };
};
