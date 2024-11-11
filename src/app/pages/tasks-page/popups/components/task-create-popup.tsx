import { memo } from "react";

import { Area, Button, Flex, Popup, Title } from "~/infrastructure/ui";

import { TaskCreateForm, TaskCreateFormSubmitButton } from "../../forms";
import { useTaskCreatePopupToggle } from "../stores";

export const TaskCreatePopup = memo(() => {
  const { taskCreatePopupToggleOn, turnTaskCreatePopupToggleOff } =
    useTaskCreatePopupToggle();

  return (
    <Popup
      opened={taskCreatePopupToggleOn}
      onClose={turnTaskCreatePopupToggleOff}
    >
      <Area paddingVertical={1.6} width="800px" maxWidth="100%">
        <Area marginHorizontal={4}>
          <Title size={4}>Create task</Title>
        </Area>

        <Area marginHorizontal={4}>
          <Area marginTop={3.2} marginBottom={4}>
            <TaskCreateForm />
          </Area>
        </Area>

        <hr />

        <Area marginHorizontal={4} marginTop={1.2}>
          <Flex gap={0.8} justifyContent="end">
            <Button
              type="text"
              color="primary-light"
              onClick={turnTaskCreatePopupToggleOff}
            >
              Cancel
            </Button>

            <TaskCreateFormSubmitButton />
          </Flex>
        </Area>
      </Area>
    </Popup>
  );
});
