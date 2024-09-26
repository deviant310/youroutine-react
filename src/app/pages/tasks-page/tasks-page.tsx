import { memo, useCallback } from "react";

import { useTitle } from "~/infrastructure/hooks";
import { useNavigator } from "~/infrastructure/router";
import {
  Area,
  Button,
  Flex,
  Paper,
  Popup,
  Table,
  TableColumns,
  Title,
} from "~/infrastructure/ui";

import { Header } from "~/concern/common/chunks";
import { taskRoute } from "~/concern/common/routes";
import { useTaskPopup } from "~/concern/common/stores";
import { useTasks } from "~/concern/common/third-party";
import { Task } from "~/concern/entities";

import { CreateTaskForm } from "./create-task-form";

export const TasksPage = memo(() => {
  useTitle("Tasks");

  const navigate = useNavigator();
  const { tasks, loadingTasks } = useTasks();

  const { taskPopupIsVisible, setTaskPopupVisibility } = useTaskPopup();

  const onRowClick = useCallback(
    (task: Task) => {
      navigate(taskRoute, { id: task.id });
    },
    [navigate],
  );

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Area marginBottom={2}>
          <Flex justifyContent="between" alignItems="center">
            <Title size={2}>Tasks</Title>

            <Button
              variant="contained"
              color="primary-light"
              onClick={() => setTaskPopupVisibility(true)}
            >
              Create task
            </Button>
          </Flex>
        </Area>

        {!tasks && loadingTasks && "Loading tasks..."}

        {tasks && (
          <Paper elevation={1} backdrop={false} radius={2}>
            <Table data={tasks} columns={columns} onRowClick={onRowClick} />
          </Paper>
        )}
      </Area>

      <Popup
        visible={taskPopupIsVisible}
        setVisibility={setTaskPopupVisibility}
      >
        <Area paddingHorizontal={10} paddingVertical={4}>
          <Title size={3}>Create task</Title>

          <CreateTaskForm />
        </Area>
      </Popup>
    </>
  );
});

const columns: TableColumns<Task> = {
  id: { caption: "ID" },
  title: { caption: "Title" },
  description: { caption: "Description" },
  approved: {
    caption: "Approved",
    cellComponent: ({ value }) => (value ? "Yes" : "No"),
  },
};

TasksPage.displayName = "TasksPage";
