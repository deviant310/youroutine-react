import {
  FieldError,
  FieldLabel,
  Fieldset,
  Grid,
  RichTextEditor,
} from "~/infrastructure/ui";

export const DescriptionField = () => {
  const initialValue = "<p>Hello World!</p><p></p>";

  return (
    <Fieldset>
      <FieldError></FieldError>

      <Grid gap={0.4}>
        <FieldLabel>Description</FieldLabel>

        <RichTextEditor initialValue={initialValue} />
      </Grid>
    </Fieldset>
  );
};
