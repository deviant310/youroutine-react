import { memo, useCallback, useEffect } from "react";

import { Alert, Button, Flex } from "~/infrastructure/ui";

import { useTaskCreating } from "~/concern/common/third-party";

import { useTaskCreateForm } from "../../stores";

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
  const { task, createTask, creatingTask } = useTaskCreating();

  const form = useTaskCreateForm();

  const formValid = form.valid();

  const onClick = useCallback(() => {
    if (creatingTask) return;

    if (formValid) {
      const { title, description, project, priority } = form.state.values;

      createTask({
        title,
        description,
        projectId: project.id,
        priority,
      });
    }
  }, [createTask, creatingTask, form.state.values, formValid]);

  const onMouseDown = useCallback(() => {
    setTimeout(() => form.clean(), 0);
    setTimeout(() => form.stain(), 100);
  }, [form]);

  useEffect(() => {
    if (task) {
      form.reset();
    }
  }, [form, task]);

  return (
    <Button
      onClick={onClick}
      onMouseDown={onMouseDown}
      loading={creatingTask}
      disabled={creatingTask}
    >
      Create task
    </Button>
  );
});
