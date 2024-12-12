import { memo, useMemo, useState } from "react";

import { UUID } from "~/typescript";

import { useDocumentTitle } from "~/react";

import { usePathParams } from "~/infrastructure/router";
import {
  Area,
  Flex,
  Grid,
  RichTextEditorField,
  Title,
  Button,
  Paper,
  useTheme,
  Text,
  SelectInput,
  Paragraph,
  Alert,
} from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import {
  useProjectsRetrieving,
  useTaskRetrieving,
} from "~/concern/common/third-party";
import { Project, TaskPriority } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

export const TaskPage = memo(() => {
  // TODO change highlighting of "typeof" keyword for vscode
  const { id } = usePathParams<typeof taskRoute>();
  // TODO UUID is redundant
  const { task, retrievingTask, retrievingTaskError } = useTaskRetrieving(
    id as UUID,
  );

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
          <>
            <Area>
              <Flex justifyContent="between" alignItems="center">
                <Title size={3}>{task.title}</Title>

                <Button color="primary-light">Take to work</Button>
              </Flex>
            </Area>

            <Grid gap={2}>
              <Alert type="warning" bordered>
                Info text
              </Alert>

              <Grid templateColumns="2fr 1fr" gap={4.4}>
                <RichTextEditorField
                  name="description"
                  label="Description"
                  value={task.description}
                  editorMinHeight="200px"
                />

                <Paper fill={colors.main} elevation={0.4}>
                  <Area padding={2}>
                    <Paragraph size="small" weight="medium">
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
                        options={TaskPriority.options}
                        getOptionKey={TaskPriority.getInstanceKey}
                        displayStringForOption={TaskPriority.getInstanceLabel}
                        value={task.priority}
                        textboxPlaceholder="Select priority"
                        textboxSize="auto"
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
                            textboxValue={nameEntry}
                            onTextboxChange={setNameEntry}
                            textboxPlaceholder="Not set"
                            textboxSize="auto"
                            implicit
                          />
                        </>
                      )}
                    </Grid>
                  </Area>
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
      </Area>
    </>
  );
});
