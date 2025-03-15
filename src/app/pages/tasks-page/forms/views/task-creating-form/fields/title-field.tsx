import { memo, useMemo } from "react";

import { TextField } from "~/infrastructure/ui";

import { useTaskCreateFormField } from "../../../handlers";

export const TitleField = memo(() => {
  const { name, value, setValue, error, dirty, stain } =
    useTaskCreateFormField("title");

  const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]);

  return (
    <TextField
      name={name}
      label="Title"
      onChange={setValue}
      value={value}
      error={displayedError}
      onInputBlur={stain}
      placeholder="Super feature"
      size="auto"
    />
  );
});
