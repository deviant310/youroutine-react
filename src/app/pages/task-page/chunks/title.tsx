import { ChangeEvent, memo, useCallback, useState } from "react";

import { usePathParams } from "~/infrastructure/router";
import { Input, InputElement, Text } from "~/infrastructure/ui";

import { useTaskPatching } from "~/concern/common/third-party";
import { taskRoute } from "~/concern/general/routes";

import { useTask } from "../task-context";

export const Title = memo(() => {
  // TODO возможно стоит как-то докрутить типы роутера, чтобы внутри task-page можно было импортировать только taskRoute
  const { id } = usePathParams<typeof taskRoute>();
  const { title: initialTitle } = useTask();
  const [title, setTitle] = useState(initialTitle);
  const { patchTask } = useTaskPatching();

  const onInputChange = useCallback(
    ({ target }: ChangeEvent<InputElement>) => {
      setTitle(target.value);
      patchTask(id, { title: target.value });
    },
    [id, patchTask],
  );

  return (
    <Text size="huge" weight="semibold">
      <Input value={title} onChange={onInputChange} autoSize />
    </Text>
  );
});
