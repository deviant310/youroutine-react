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

export const useTaskCreatingForm = () => {
  const form = useForm();

  const {
    createTask,
    creatingTask: submitting,
    creatingTaskError: submittingError,
    taskCreated: submitted,
  } = useTaskCreating();

  const submit = useCallback(() => {
    if (submitting) return;
    if (!form.valid()) return;

    const { values } = form.getState();

    const { title, description, project, priority } = values;

    createTask({
      title,
      description,
      projectId: project.id,
      priority,
    });
  }, [createTask, form, submitting]);

  const highlightErrors = useCallback(() => {
    requestAnimationFrame(() => form.clean());
    requestAnimationFrame(() => form.stain());
  }, [form]);

  useEffect(() => {
    if (submitted) form.reset();
  }, [form, submitted]);

  return {
    submit,
    submitting,
    submittingError,
    submitted,
    highlightErrors,
  };
};

export const useTaskCreateFormField = useField;

interface TaskCreateFormValues {
  title: string;
  description: string;
  project: Project | null;
  priority: TaskPriority | null;
}

interface TaskCreateFormValidValues extends TaskCreateFormValues {
  project: Project;
  priority: TaskPriority;
}
