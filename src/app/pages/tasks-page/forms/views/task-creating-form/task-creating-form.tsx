import { memo } from "react";

import { Alert, Flex, Popup } from "~/infrastructure/ui";

import { useTaskCreatingForm } from "../../handlers";

import {
  DescriptionField,
  PriorityField,
  ProjectField,
  TitleField,
} from "./fields";

export const TaskCreatingForm = memo(() => {
  const { submittingError, submittingErrorEnabled, disableSubmittingError } =
    useTaskCreatingForm();

  return (
    <>
      <TitleField />

      <DescriptionField />

      <Flex justifyContent="between" gap={2}>
        <ProjectField />

        <PriorityField />
      </Flex>

      <Popup opened={submittingErrorEnabled} close={disableSubmittingError}>
        {submittingError instanceof Error && (
          <Alert type="error">{submittingError.message}</Alert>
        )}
      </Popup>
    </>
  );
});
