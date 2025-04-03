import { useCallback, useSyncExternalStore } from "react";

import { Toggle } from "./toggle";

export const useToggleInstance = (toggle: Toggle) => {
  const subscribe = useCallback(
    (dispatch: () => void) => toggle.onChange(dispatch),
    [toggle],
  );

  const getSnapshot = useCallback(() => toggle.isOn, [toggle]);

  const isOn = useSyncExternalStore(subscribe, getSnapshot);

  const turnOn = useCallback(() => toggle.turnOn(), [toggle]);
  const turnOff = useCallback(() => toggle.turnOff(), [toggle]);

  return { isOn, turnOn, turnOff };
};
