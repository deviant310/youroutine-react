import { useCallback } from "react";

import { createPrimitiveStore } from "~/infrastructure/stores";

const { useValue } = createPrimitiveStore(false);

export const useProjectCreatePopupToggle = () => {
  const { value: projectCreatePopupToggleIsOn, setValue } = useValue();

  const turnProjectCreatePopupToggleOn = useCallback(
    () => setValue(true),
    [setValue],
  );

  const turnProjectCreatePopupToggleOff = useCallback(
    () => setValue(false),
    [setValue],
  );

  return {
    projectCreatePopupToggleIsOn,
    turnProjectCreatePopupToggleOn,
    turnProjectCreatePopupToggleOff,
  };
};
