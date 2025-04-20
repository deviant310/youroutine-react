import { memo, ReactNode, useCallback, useEffect } from "react";

import {
  createFormContext,
  FormValidationError,
} from "~/infrastructure/state/form";

import { useTaskCreating } from "~/concern/common/third-party";
import { Project, TaskPriority } from "~/concern/general/entities";

const { FormProvider, useFormState, useFormFieldState } = createFormContext<
  TaskCreateFormValues,
  TaskCreateFormValidValues,
  "project"
>();

export const TaskCreateFormProvider = memo<{ children: ReactNode }>(
  ({ children }) => (
    <FormProvider
      fieldsConfig={{
        title: {
          defaultValue: "",
          validate(value) {
            if (!value) throw new FormValidationError("Title required");

            return value;
          },
        },
        description: {
          defaultValue: "",
        },
        project: {
          defaultValue: null,
          validate(value) {
            if (!value) throw new FormValidationError("Project required");

            return value;
          },
          enabled() {
            return true;
          },
          //onInit() {},
          //dependsOn: [],
        },
        priority: {
          defaultValue: "medium",
          validate(value) {
            if (!value) throw new FormValidationError("Priority required");

            return value;
          },
        },
      }}
    >
      {children}
    </FormProvider>
  ),
);

export const useTaskCreateForm = () => {
  const {
    createTask,
    creatingTask: submitting,
    creatingTaskError: submittingError,
    taskCreated: submitted,
  } = useTaskCreating();

  const { validValues } = useFormState();

  const submit = useCallback(() => {
    if (!validValues) return;

    const { title, description, project, priority } = validValues;

    createTask({
      title,
      description,
      projectId: project.id,
      priority,
    });
  }, [createTask, validValues]);

  const highlightErrors = useCallback(() => {
    //requestAnimationFrame(() => form.clean());
    //requestAnimationFrame(() => form.stain());
  }, []);

  useEffect(() => {
    //if (submitted) form.reset();
  }, []);

  return {
    submit,
    submitting,
    submittingError,
    submitted,
    highlightErrors,
  };
};

export const useTaskCreateFormField = useFormFieldState;

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
