import { createPrimitiveStore } from "~/infrastructure/stores";

const { useStore } = createPrimitiveStore(false);

export const useTaskCreatePopupToggle = () => {
  const {
    value: taskCreatePopupToggleOn,
    setValueOn: turnTaskCreatePopupToggleOn,
    setValueOff: turnTaskCreatePopupToggleOff,
  } = useStore();

  return {
    taskCreatePopupToggleOn,
    turnTaskCreatePopupToggleOn,
    turnTaskCreatePopupToggleOff,
  };
};
