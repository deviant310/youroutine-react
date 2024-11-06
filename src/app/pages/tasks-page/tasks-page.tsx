import { memo, useCallback } from "react";

import { useDocumentTitle } from "~/react";

import { useNavigator } from "~/infrastructure/router";
import {
  Area,
  Button,
  Flex,
  Table,
  TableColumns,
  Title,
} from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { useTasksRetrieving } from "~/concern/common/third-party";
import { Task } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

import { TaskCreatePopup, useTaskCreatePopupToggle } from "./popups";

export const TasksPage = memo(() => {
  useDocumentTitle("Tasks");

  const navigate = useNavigator();
  const { turnTaskCreatePopupToggleOn } = useTaskCreatePopupToggle();
  const { tasks, retrievingTasks } = useTasksRetrieving();

  const onRowClick = useCallback(
    (task: Task) => {
      navigate(taskRoute.build({ id: task.id }));
    },
    [navigate],
  );

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Area marginBottom={0.8}>
          <Flex justifyContent="between" alignItems="center">
            <Title size={3}>Tasks</Title>

            <Button type="primary-light" onClick={turnTaskCreatePopupToggleOn}>
              Create task
            </Button>
          </Flex>
        </Area>

        {!tasks && retrievingTasks && "Loading tasks..."}

        {tasks && (
          <Table data={tasks} columns={columns} onRowClick={onRowClick} />
        )}
      </Area>

      <TaskCreatePopup />
    </>
  );
});

const columns: TableColumns<Task> = {
  id: { caption: "ID" },
  title: { caption: "Title" },
  description: { caption: "Description" },
};

TasksPage.displayName = "TasksPage";
