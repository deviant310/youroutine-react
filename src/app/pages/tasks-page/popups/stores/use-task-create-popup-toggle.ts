import { useCallback } from "react";

import { createValueStore } from "~/infrastructure/stores";

const { useValue } = createValueStore(false);

export const useTaskCreatePopupToggle = () => {
  const { value: taskCreatePopupToggleOn, setValue } = useValue();

  const turnTaskCreatePopupToggleOn = useCallback(
    () => setValue(true),
    [setValue],
  );

  const turnTaskCreatePopupToggleOff = useCallback(
    () => setValue(false),
    [setValue],
  );

  return {
    taskCreatePopupToggleOn,
    turnTaskCreatePopupToggleOn,
    turnTaskCreatePopupToggleOff,
  };
};
