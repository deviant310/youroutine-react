import { memo } from "react";

import { Alert, Button, Flex } from "~/infrastructure/ui";

import { useTaskCreating } from "~/concern/common/third-party";

import { useTaskCreateForm } from "../../hooks";

import {
  DescriptionField,
  PriorityField,
  ProjectField,
  TitleField,
} from "./fields";

export const TaskCreateForm = memo(() => {
  const { creatingTaskError } = useTaskCreating();

  return (
    <>
      <TitleField />

      <DescriptionField />

      <Flex justifyContent="between" gap={2}>
        <ProjectField />

        <PriorityField />
      </Flex>

      {creatingTaskError instanceof Error && (
        <Alert type="error">{creatingTaskError.message}</Alert>
      )}
    </>
  );
});

export const TaskCreateFormSubmitButton = memo(() => {
  const {
    submitTaskCreateForm,
    submittingTaskCreateForm,
    highlightTaskCreateFormErrors,
  } = useTaskCreateForm();

  return (
    <Button
      onClick={submitTaskCreateForm}
      onMouseDown={highlightTaskCreateFormErrors}
      loading={submittingTaskCreateForm}
      disabled={submittingTaskCreateForm}
    >
      Create task
    </Button>
  );
});
