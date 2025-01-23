import { memo, useEffect } from "react";

import { Area, Button, Flex, Popup, Title } from "~/infrastructure/ui";

import { TaskCreateForm, useTaskCreateForm } from "../../forms";
import { useTaskCreatePopupToggle } from "../toggles";

export const TaskCreatePopup = memo(() => {
  const popupToggle = useTaskCreatePopupToggle();
  const taskCreateForm = useTaskCreateForm();

  useEffect(() => {
    if (taskCreateForm.submitted) popupToggle.setValueOff();
  }, [popupToggle, taskCreateForm.submitted]);

  return (
    <Popup opened={popupToggle.value} onClose={popupToggle.setValueOff}>
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
            <Button variant="link" onClick={popupToggle.setValueOff}>
              Cancel
            </Button>

            <Button
              onClick={taskCreateForm.submit}
              onMouseDown={taskCreateForm.highlightErrors}
              loading={taskCreateForm.submitting}
              disabled={taskCreateForm.submitting}
            >
              Create task
            </Button>
          </Flex>
        </Area>
      </Area>
    </Popup>
  );
});
