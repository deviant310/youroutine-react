import { createFormStore, ValidationError } from "~/infrastructure/stores";

import { Project, TaskPriority } from "~/concern/general/entities";

export const { useForm: useTaskCreateForm, useField: useTaskCreateFormField } =
  createFormStore<TaskCreateFormValues, TaskCreateFormValidValues>({
    title: {
      initialValue: "",
      validate(value) {
        if (!value) throw new ValidationError("Title required");

        return value;
      },
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

interface TaskCreateFormValues {
  title: string;
  project: Project | null;
  priority: TaskPriority | null;
}

interface TaskCreateFormValidValues {
  title: string;
  project: Project;
  priority: TaskPriority;
}
