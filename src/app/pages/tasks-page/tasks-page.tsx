import { memo } from "react";

import { useDocumentTitle } from "~/react";

import { Area, Button, Flex, Title } from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";

import { TaskCreatePopup, useTaskCreatePopupToggle } from "./popups";
import { TasksTable } from "./tasks-table";

export const TasksPage = memo(() => {
  useDocumentTitle("Tasks");

  const popupToggle = useTaskCreatePopupToggle();

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Area marginBottom={0.8}>
          <Flex justifyContent="between" alignItems="center">
            <Title size={3}>Tasks</Title>

            <Button color="primary-light" onClick={popupToggle.setValueOn}>
              Create task
            </Button>
          </Flex>
        </Area>

        <TasksTable />
      </Area>

      <TaskCreatePopup />
    </>
  );
});

TasksPage.displayName = "TasksPage";
