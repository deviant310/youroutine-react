import { memo, useEffect } from "react";

import { Area, Button, Flex, Popup, Heading } from "~/infrastructure/ui";

import { TaskCreatingForm, useTaskCreatingForm } from "../../forms";
import { useTaskCreatePopupToggle } from "../toggles";

export const TaskCreatePopup = memo(() => {
  const [popupToggleIsOn, popupToggle] = useTaskCreatePopupToggle();
  const taskCreatingForm = useTaskCreatingForm();

  useEffect(() => {
    if (taskCreatingForm.submitted) popupToggle.setValueOff();
  }, [popupToggle, taskCreatingForm.submitted]);

  return (
    <Popup opened={popupToggleIsOn} onClose={popupToggle.setValueOff}>
      <Area width="800px" maxWidth="100%">
        <Area marginHorizontal={4} marginVertical={3.2}>
          <Heading $level={4}>Create task</Heading>

          <Area marginVertical={3.2}>
            <TaskCreatingForm />
          </Area>
        </Area>

        <hr />

        <Area marginHorizontal={4} marginVertical={1.6}>
          <Flex gap={0.8} justifyContent="end">
            <Button variant="link" onClick={popupToggle.setValueOff}>
              Cancel
            </Button>

            <Button
              onClick={taskCreatingForm.submit}
              onMouseDown={taskCreatingForm.highlightErrors}
              loading={taskCreatingForm.submitting}
              disabled={taskCreatingForm.submitting}
            >
              Create task
            </Button>
          </Flex>
        </Area>
      </Area>
    </Popup>
  );
});
