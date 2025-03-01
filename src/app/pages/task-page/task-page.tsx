import { memo, useMemo, useState } from "react";

import { useDocumentTitle } from "~/react";

import { usePathParams } from "~/infrastructure/router";
import {
  Area,
  Flex,
  Grid,
  RichTextEditorField,
  Button,
  Paper,
  useTheme,
  Text,
  SelectInput,
  Paragraph,
  Alert,
} from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { taskPriorities } from "~/concern/common/data";
import {
  useProjectsRetrieving,
  useTaskRetrieving,
} from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

export const TaskPage = memo(() => {
  const { id } = usePathParams<typeof taskRoute>();
  const { task, retrievingTask, retrievingTaskError } = useTaskRetrieving(id);
  const { getProjectsFilteredByNameEntry } = useProjectsRetrieving();
  const [nameEntry, setNameEntry] = useState("");
  const { colors } = useTheme();

  const filteredProjects = useMemo(
    () => getProjectsFilteredByNameEntry(nameEntry),
    [getProjectsFilteredByNameEntry, nameEntry],
  );

  useDocumentTitle(`Task ${id}`);

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        {/* TODO Blocking rendering */}
        {!task && retrievingTask && "Loading task..."}

        {retrievingTaskError instanceof Error && retrievingTaskError.message}

        {task && (
          <Grid gap={2}>
            <Flex justifyContent="between" alignItems="center">
              <Text size="huge" weight="semibold">
                {task.title}
              </Text>

              <Button color="primary-light">Take to work</Button>
            </Flex>

            <Alert type="warning" bordered>
              Info text
            </Alert>

            <Grid templateColumns="2fr 1fr" gap={4.4} alignItems="top">
              <RichTextEditorField
                name="description"
                label="Description"
                value={task.description}
                minHeight="200px"
              />

              <Paper $fill={colors.main} $elevation={0.4}>
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
                      value={task.priority}
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
        )}
      </Area>
    </>
  );
});
