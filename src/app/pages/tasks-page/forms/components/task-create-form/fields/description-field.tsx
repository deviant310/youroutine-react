import { useMemo } from "react";

import { RichTextEditorField } from "~/infrastructure/ui";

import { useTaskCreateFormField } from "../../../hooks";

export const DescriptionField = () => {
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
      editorMinHeight="100px"
    />
  );
};
