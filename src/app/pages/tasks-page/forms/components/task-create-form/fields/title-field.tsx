import { useMemo } from "react";

import { TextField } from "~/infrastructure/ui";

import { useTaskCreateFormField } from "../../../stores";

export const TitleField = () => {
  const { name, value, setValue, error, dirty, stain } =
    useTaskCreateFormField("title");

  const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]);

  return (
    <TextField
      name={name}
      label="Title"
      setValue={setValue}
      value={value}
      error={displayedError}
      onTextboxBlur={stain}
      textboxPlaceholder="Super feature"
      textboxSize="auto"
    />
  );
};
