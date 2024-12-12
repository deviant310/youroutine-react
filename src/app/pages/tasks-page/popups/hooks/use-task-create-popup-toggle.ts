import { createPrimitiveStore } from "~/infrastructure/stores";

const { useStore } = createPrimitiveStore(false);

export const useTaskCreatePopupToggle = () => {
  const {
    value: taskCreatePopupToggleIsOn,
    setValueOn: turnTaskCreatePopupToggleOn,
    setValueOff: turnTaskCreatePopupToggleOff,
  } = useStore();

  return {
    taskCreatePopupToggleIsOn,
    turnTaskCreatePopupToggleOn,
    turnTaskCreatePopupToggleOff,
  };
};
