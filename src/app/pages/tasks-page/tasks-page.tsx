import { memo } from "react";

import { useDocumentTitle } from "~/react";

import { useToggle } from "~/infrastructure/stores";
import { Area, Button, Flex, Grid, Text } from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";

import { TaskCreatePopup } from "./popups";
import { TasksTable } from "./tasks-table";

export const TasksPage = memo(() => {
  useDocumentTitle("Tasks");

  const { turnOn } = useToggle("task-create-popup");

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px" marginBottom={4.4}>
        <Grid gap={2}>
          <Flex justifyContent="between" alignItems="center">
            <Text size="huge" weight="semibold">
              Tasks
            </Text>

            <Button color="primary-light" onClick={turnOn}>
              Create task
            </Button>
          </Flex>

          <TasksTable />
        </Grid>
      </Area>

      <TaskCreatePopup />
    </>
  );
});

TasksPage.displayName = "TasksPage";
