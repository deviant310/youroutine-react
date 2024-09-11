import { useCallback, useMemo, useState } from "react";

export function useToggle<
  Value extends True | False,
  True = true,
  False = false,
>(initialValue: Value, positive = true as True, negative = false as False) {
  const [value, setValue] = useState<True | False>(initialValue);
  const on = useCallback(() => setValue(positive as Value), [positive]);
  const off = useCallback(() => setValue(negative as Value), [negative]);

  const toggle = useCallback(
    () =>
      setValue(value === positive ? (negative as Value) : (positive as Value)),
    [negative, positive, value],
  );

  return useMemo(
    () => [value, { off, on, toggle }] as const,
    [off, on, toggle, value],
  );
}
