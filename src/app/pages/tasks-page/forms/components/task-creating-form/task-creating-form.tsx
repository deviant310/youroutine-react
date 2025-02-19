import { memo } from "react";

import { Alert, Flex } from "~/infrastructure/ui";

import { useTaskCreatingForm } from "../../handlers";

import {
  DescriptionField,
  PriorityField,
  ProjectField,
  TitleField,
} from "./fields";

export const TaskCreatingForm = memo(() => {
  const { submittingError } = useTaskCreatingForm();

  return (
    <>
      <TitleField />

      <DescriptionField />

      <Flex justifyContent="between" gap={2}>
        <ProjectField />

        <PriorityField />
      </Flex>

      {submittingError instanceof Error && (
        <Alert type="error">{submittingError.message}</Alert>
      )}
    </>
  );
});
