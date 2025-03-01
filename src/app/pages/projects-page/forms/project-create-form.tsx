import { memo, useEffect, useMemo, useState } from "react";

import { TextField } from "~/infrastructure/ui";

export const ProjectCreateForm = memo<FormProps>(
  ({ submitting, stopSubmitting }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const nameError = useMemo(() => {
      if (!name) return "Name required";
    }, [name]);

    useEffect(() => {
      if (!submitting) return;

      new Promise<void>(resolve =>
        setTimeout(() => {
          console.log("submitted!");
          resolve();
        }, 1000),
      ).then(stopSubmitting);
    }, [stopSubmitting, submitting]);

    return (
      <>
        <TextField
          name="name"
          label="Name"
          onChange={setName}
          value={name}
          error={nameError}
          placeholder="Project name"
          size="auto"
        />

        <TextField
          name="description"
          label="Description"
          onChange={setDescription}
          value={description}
          placeholder="Project description"
          size="auto"
        />
      </>
    );
  },
);

interface FormProps {
  submitting: boolean;
  stopSubmitting(): void;
}
