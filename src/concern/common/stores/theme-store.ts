import { createStore } from "infrastructure/store";
import { Theme } from "infrastructure/ui";

export const { useStore: useTheme } = createStore<Theme>();
