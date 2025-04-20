import { memo } from "react";

import { Alert, Grid } from "~/infrastructure/ui";

import { useTaskCreateForm } from "../../handlers";

import {
  DescriptionField,
  PriorityField,
  ProjectField,
  TitleField,
} from "./fields";

export const TaskCreateForm = memo(() => {
  const { submittingError } = useTaskCreateForm();

  return (
    <>
      <TitleField />

      <DescriptionField />

      <Grid alignItems="start" columns={2} gap={2}>
        <ProjectField />

        <PriorityField />
      </Grid>

      {submittingError instanceof Error && (
        <Alert type="error" message={submittingError.message} />
      )}
    </>
  );
});
