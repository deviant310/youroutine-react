import { useCallback, useMemo, useState } from "react";

export function useToggle<
  Value extends Positive | Negative,
  Positive extends string | number | boolean = true,
  Negative extends string | number | boolean = false,
>(
  initialValue = false as Value,
  positive = true as Positive,
  negative = false as Negative,
) {
  const [value, setValue] = useState<Positive | Negative>(initialValue);
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
