import { ChangeEvent, memo, useCallback, useState } from "react";

import { Input, InputElement, Text } from "~/infrastructure/ui";

import { useTaskPatching } from "~/concern/common/third-party";

import { usePathParams, useTask } from "../context";

export const Title = memo(() => {
  const { taskId } = usePathParams();
  const { title: initialTitle } = useTask();
  const [title, setTitle] = useState(initialTitle);
  const { patchTask } = useTaskPatching();

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<InputElement>) => {
      const { value: nextTitle } = target;

      setTitle(nextTitle);
      patchTask(taskId, { title: nextTitle });
    },
    [patchTask, taskId],
  );

  return (
    <Text size="huge" weight="semibold">
      <Input value={title} onChange={onInputChange} autoSize />
    </Text>
  );
});
