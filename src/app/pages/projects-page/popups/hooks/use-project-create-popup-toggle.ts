import { createPrimitiveStore } from "~/infrastructure/stores";

const { useStore } = createPrimitiveStore(false);

export const useProjectCreatePopupToggle = () => {
  const {
    value: projectCreatePopupToggleOn,
    setValueOn: turnProjectCreatePopupToggleOn,
    setValueOff: turnProjectCreatePopupToggleOff,
  } = useStore();

  return {
    projectCreatePopupToggleOn,
    turnProjectCreatePopupToggleOn,
    turnProjectCreatePopupToggleOff,
  };
};
