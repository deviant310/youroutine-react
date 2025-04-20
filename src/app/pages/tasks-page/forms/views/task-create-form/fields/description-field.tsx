import { memo } from "react";

import { RichTextEditorField } from "~/infrastructure/ui";

import { useTaskCreateFormField } from "../../../handlers";

export const DescriptionField = memo(() => {
  const { name, value, error, setValue } =
    useTaskCreateFormField("description");

  /* const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]); */

  return (
    <RichTextEditorField
      name={name}
      label="Description"
      value={value}
      onChange={setValue}
      error={error}
      //onEditorBlur={stain}
      minHeight="100px"
    />
  );
});
