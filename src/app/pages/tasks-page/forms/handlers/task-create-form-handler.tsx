import { memo, ReactNode, useCallback, useEffect } from "react";

import {
  createFormContext,
  FormValidationError,
} from "~/infrastructure/state/form";
import { getRichTextEditorTextFromHTML } from "~/infrastructure/ui";

import { useTaskCreating } from "~/concern/common/third-party";
import { Project, TaskPriority, User } from "~/concern/general/entities";

const { FormProvider, useFormState, useFormFieldState } = createFormContext<
  TaskCreateFormValues,
  TaskCreateFormValidValues
>();

export const TaskCreateFormProvider = memo<{ children: ReactNode }>(
  ({ children }) => (
    <FormProvider
      fieldsConfig={{
        title: {
          defaultValue: "",
          validate(title) {
            if (!title) throw new FormValidationError("Title required");

            return title;
          },
        },
        description: {
          defaultValue: "",
          validate(description, { assignee }) {
            debugger;
            if (assignee && !getRichTextEditorTextFromHTML(description))
              throw new FormValidationError("Description required");

            return description;
          },
        },
        project: {
          defaultValue: null,
          validate(project) {
            if (!project) throw new FormValidationError("Project required");

            return project;
          },
          //onInit() {},
          //dependsOn: [],
        },
        priority: {
          defaultValue: "medium",
          validate(priority) {
            if (!priority) throw new FormValidationError("Priority required");

            return priority;
          },
        },
        assignee: {
          defaultValue: null,
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

  const { validValues, fields } = useFormState();

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
    fields,
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
  assignee: User | null;
}

interface TaskCreateFormValidValues extends TaskCreateFormValues {
  project: Project;
  priority: TaskPriority;
}
