import { memo, useEffect, useMemo } from "react";

import { RichTextEditorField } from "~/infrastructure/ui";

import { useTaskCreateFormField } from "../../../handlers";

export const DescriptionField = memo(() => {
  const { name, value, setValue, error, dirty, stain } =
    useTaskCreateFormField("description");

  useEffect(() => {
    setTimeout(
      () =>
        setValue(
          "<ul><li><p>one</p></li><li><p>two</p></li><li><p>three</p></li><li><p>four</p></li></ul>",
        ),
      5000,
    );
  }, [setValue]);

  console.log(value);

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
