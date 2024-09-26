import { useState } from "react";

import { TextField } from "~/infrastructure/ui";

export const CreateTaskForm = () => {
  const [title, setTitle] = useState("");

  return <TextField label="Task title" setValue={setTitle} value={title} />;
};
