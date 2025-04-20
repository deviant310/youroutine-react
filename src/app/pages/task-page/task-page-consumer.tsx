import { memo, useMemo, useState } from "react";

import {
  Alert,
  Area,
  Button,
  Flex,
  Grid,
  Paper,
  Paragraph,
  SelectInput,
  Text,
  useTheme,
} from "~/infrastructure/ui";

import { taskPriorities } from "~/concern/common/data";
import { useProjectsRetrieving } from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";

import { Description, Title } from "./content";
import { useTask } from "./providers";

export const TaskPageConsumer = memo(() => {
  const { priority } = useTask();
  const { getProjectsFilteredByNameEntry } = useProjectsRetrieving();
  const [nameEntry, setNameEntry] = useState("");
  const { colors } = useTheme();

  const filteredProjects = useMemo(
    () => getProjectsFilteredByNameEntry(nameEntry),
    [getProjectsFilteredByNameEntry, nameEntry],
  );

  return (
    <Grid gap={2}>
      <Flex justifyContent="space-between" alignItems="center">
        <Title />

        <Button color="primary-light">Take to work</Button>
      </Flex>

      <Alert type="warning" message="Info text" bordered />

      <Grid templateColumns="5fr 3fr" gap={4.4} alignItems="start">
        <Description />

        {/* TODO color passing shouldn't be here */}
        <Paper fill={colors.main} elevation={0.4}>
          <Area padding={2}>
            <Paragraph size="compact" weight="medium">
              Details
            </Paragraph>

            <Grid
              templateColumns="1fr 3fr"
              alignItems="baseline"
              rowGap={0.4}
              columnGap={1.6}
            >
              <Text color="xlight">Priority</Text>

              <SelectInput
                options={taskPriorities.keys()}
                displayStringForOption={taskPriorities.getValue}
                renderOption={taskPriorities.getValue}
                value={priority}
                placeholder="Select priority"
                size="auto"
                implicit
              />

              {filteredProjects && (
                <>
                  <Text color="xlight">Project</Text>

                  <SelectInput
                    options={filteredProjects}
                    value={null}
                    displayStringForOption={Project.getInstanceName}
                    getOptionKey={Project.getInstanceId}
                    searchValue={nameEntry}
                    onSearchChange={setNameEntry}
                    placeholder="Not set"
                    size="auto"
                    implicit
                  />
                </>
              )}
            </Grid>
          </Area>
        </Paper>
      </Grid>
    </Grid>
  );
});
