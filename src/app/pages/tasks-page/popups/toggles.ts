import { createTogglesContext } from "~/infrastructure/state/toggle";

const { TogglesProvider: PopupsTogglesProvider, useToggle: usePopupToggle } =
  createTogglesContext();

export { PopupsTogglesProvider };

export const useTaskCreatePopupToggle = () => usePopupToggle("task-create");
