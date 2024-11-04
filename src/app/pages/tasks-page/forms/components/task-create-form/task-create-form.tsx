import { memo, useCallback } from "react";

import { Button, Flex } from "~/infrastructure/ui";

import { useTaskCreating } from "~/concern/common/third-party";

import { useTaskCreateForm } from "../../stores";

import {
  DescriptionField,
  PriorityField,
  ProjectField,
  TitleField,
} from "./fields";

export const TaskCreateForm = memo(() => (
  <>
    <TitleField />

    <DescriptionField />

    <Flex justifyContent="between" gap={2}>
      <ProjectField />

      <PriorityField />
    </Flex>
  </>
));

export const TaskCreateFormSubmitButton = memo(() => {
  const { createTask, creatingTask } = useTaskCreating();
  const form = useTaskCreateForm();
  const formValid = form.valid();

  const onMouseDown = useCallback(() => {
    setTimeout(() => form.clean(), 0);
    setTimeout(() => form.stain(), 100);
  }, [form]);

  const onClick = useCallback(() => {
    if (creatingTask) return;

    if (formValid) {
      const { title, project, priority } = form.state.values;

      createTask({
        title,
        description: "",
        projectId: project.id,
        priority,
      });
    }
  }, [createTask, creatingTask, form.state.values, formValid]);

  return (
    <Button onClick={onClick} onMouseDown={onMouseDown} disabled={creatingTask}>
      Create task
    </Button>
  );
});
