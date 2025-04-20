import { memo } from "react";

import { useDocumentTitle } from "~/react";

import { Area, Button, Flex, Grid, Text } from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";

import { TaskCreatePopup, useTaskCreatePopupToggle } from "./popups";
import { TasksTable } from "./tasks-table";

export const TasksPageConsumer = memo(() => {
  useDocumentTitle("Tasks");

  const { turnOn } = useTaskCreatePopupToggle();

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px" marginBottom={4.4}>
        <Grid gap={2}>
          <Flex justifyContent="space-between" alignItems="center">
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

TasksPageConsumer.displayName = "TasksPageConsumer";
