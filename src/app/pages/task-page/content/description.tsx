import { memo, useCallback, useState } from "react";

import { RichTextEditor, RichTextEditorChangeEvent } from "~/infrastructure/ui";

import { useTaskPatching } from "~/concern/common/third-party";

import { usePathParams, useTask } from "../providers";

export const Description = memo(() => {
  const { taskId } = usePathParams();
  const { description: initialDescription } = useTask();
  const [description, setDescription] = useState(initialDescription);
  const { patchTask } = useTaskPatching();

  const onEditorChange = useCallback(
    ({ editor }: RichTextEditorChangeEvent) => {
      const nextDescription = editor.getHTML();

      setDescription(nextDescription);
      patchTask(taskId, { description: nextDescription });
    },
    [patchTask, taskId],
  );

  return (
    <RichTextEditor
      value={description}
      onChange={onEditorChange}
      minHeight="200px"
    />
  );
});
