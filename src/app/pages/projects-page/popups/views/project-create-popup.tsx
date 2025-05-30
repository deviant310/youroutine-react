import { memo } from "react";

import { useToggle } from "~/react";

import { Area, Button, Flex, Popup, Heading } from "~/infrastructure/ui";

import { ProjectCreateForm } from "../../forms";
import { useProjectCreatePopupToggle } from "../toggles";

export const ProjectCreatePopup = memo(() => {
  const { isOn, turnOff } = useProjectCreatePopupToggle();

  const {
    value: submitting,
    on: startSubmitting,
    off: stopSubmitting,
  } = useToggle();

  return (
    <Popup opened={isOn} close={turnOff}>
      <Area paddingVertical={1.6} width="500px" maxWidth="100%">
        <Area marginHorizontal={4}>
          <Heading level={4}>Create project</Heading>

          <Area marginTop={3.2} marginBottom={4}>
            <ProjectCreateForm
              submitting={submitting}
              stopSubmitting={stopSubmitting}
            />
          </Area>
        </Area>

        <hr />

        <Area marginHorizontal={4} marginTop={1.2}>
          <Flex gap={0.8} justifyContent="end">
            <Button variant="link" onClick={turnOff}>
              Cancel
            </Button>

            <Button onClick={startSubmitting}>Create project</Button>
          </Flex>
        </Area>
      </Area>
    </Popup>
  );
});
