import { useCallback, useEffect } from "react";

import { createFormStore, ValidationError } from "~/infrastructure/stores";

import { useTaskCreating } from "~/concern/common/third-party";
import { Project, TaskPriority } from "~/concern/general/entities";

const { useForm, useField } = createFormStore<
  TaskCreateFormValues,
  TaskCreateFormValidValues
>({
  title: {
    initialValue: "",
    validate(value) {
      if (!value) throw new ValidationError("Title required");

      return value;
    },
  },
  description: {
    initialValue: "",
  },
  project: {
    initialValue: null,
    validate(value) {
      if (!value) throw new ValidationError("Project required");

      return value;
    },
  },
  priority: {
    initialValue: TaskPriority.options[1],
    validate(value) {
      if (!value) throw new ValidationError("Priority required");

      return value;
    },
  },
});

export const useTaskCreateForm = () => {
  const form = useForm();

  const {
    task,
    createTask,
    creatingTask: taskCreateFormSubmitting,
    taskCreated: taskCreateFormSubmitted,
  } = useTaskCreating();

  const taskCreateFormSubmit = useCallback(() => {
    if (taskCreateFormSubmitting) return;
    if (!form.valid()) return;

    const { title, description, project, priority } = form.getState().values;

    createTask({
      title,
      description,
      projectId: project.id,
      priority,
    });
  }, [createTask, form, taskCreateFormSubmitting]);

  const taskCreateFormHighlightErrors = useCallback(() => {
    requestAnimationFrame(() => form.clean());
    requestAnimationFrame(() => form.stain());
  }, [form]);

  useEffect(() => task && form.reset(), [form, task]);

  return {
    task,
    taskCreateFormSubmit,
    taskCreateFormSubmitting,
    taskCreateFormSubmitted,
    taskCreateFormHighlightErrors,
  };
};

export const useTaskCreateFormField = useField;

interface TaskCreateFormValues {
  title: string;
  description: string;
  project: Project | null;
  priority: TaskPriority | null;
}

interface TaskCreateFormValidValues {
  title: string;
  description: string;
  project: Project;
  priority: TaskPriority;
}
