import { createStore } from "~/infrastructure/store";

const { useStore } = createStore(false);

export const useTaskPopup = () => {
  const { value: taskPopupIsVisible, setValue: setTaskPopupVisibility } =
    useStore();

  return { taskPopupIsVisible, setTaskPopupVisibility };
};
