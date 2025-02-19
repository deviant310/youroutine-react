import { createPrimitiveStore } from "~/infrastructure/stores";

export const useTaskCreatePopupToggle = createPrimitiveStore<boolean>(false);
