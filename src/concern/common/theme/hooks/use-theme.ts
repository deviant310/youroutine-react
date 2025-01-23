import { useCallback, useEffect, useState } from "react";
// TODO переместить в infra
export const useTheme = () => {
  const [theme, setThemeValue] = useState<ThemeMode>(
    getThemeModeFromStoredValue(window.localStorage.getItem(themeStorageKey)),
  );

  const setTheme = useCallback((themeMode: ThemeMode) => {
    localStorage.setItem("theme", themeMode);

    setThemeValue(themeMode);
  }, []);

  const onStorageUpdate = useCallback((event: StorageEvent) => {
    if (event.key === themeStorageKey)
      setThemeValue(getThemeModeFromStoredValue(event.newValue));
  }, []);

  useEffect(() => {
    window.addEventListener("storage", onStorageUpdate);

    return () => window.removeEventListener("storage", onStorageUpdate);
  }, [onStorageUpdate]);

  return { theme, setTheme };
};

const themeStorageKey = "theme";

const getThemeModeFromStoredValue = (value: string | null): ThemeMode => {
  if (value === "light") return "light";
  if (value === "dark") return "dark";

  return "system";
};

type ThemeMode = "light" | "dark" | "system";
