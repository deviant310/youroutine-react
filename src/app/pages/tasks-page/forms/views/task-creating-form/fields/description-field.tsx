import { memo, useMemo } from "react";

import { RichTextEditorField } from "~/infrastructure/ui";

import { useTaskCreateFormField } from "../../../handlers";

export const DescriptionField = memo(() => {
  const { name, value, setValue, error, dirty, stain } =
    useTaskCreateFormField("description");

  const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]);

  return (
    <RichTextEditorField
      name={name}
      label="Description"
      value={value}
      onChange={setValue}
      error={displayedError}
      onEditorBlur={stain}
      minHeight="100px"
    />
  );
});
