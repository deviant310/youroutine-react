import { memo, useCallback } from "react";

import { useNavigator } from "~/infrastructure/router";
import {
  Area,
  getRichTextEditorTextFromHTML,
  Table,
  TableCellProps,
  TableColumns,
  Text,
} from "~/infrastructure/ui";

import { useTasksRetrieving } from "~/concern/common/third-party";
import { Task, TaskAttributes } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

export const TasksTable = memo(() => {
  const navigate = useNavigator();
  const { tasks, retrievingTasks } = useTasksRetrieving();

  const onRowClick = useCallback(
    (task: Task) => {
      navigate(taskRoute.build({ id: task.id }));
    },
    [navigate],
  );

  return (
    <>
      {!tasks && retrievingTasks && "Loading tasks..."}

      {tasks && (
        <Table rowsData={tasks} columns={columns} onRowClick={onRowClick} />
      )}
    </>
  );
});

const DescriptionCell = memo<TableCellProps<TaskAttributes, "description">>(
  ({ value }) => {
    const formattedValue = getRichTextEditorTextFromHTML(value);

    return (
      <Area overflow="hidden" textOverflow="ellipsis">
        <Text nowrap>{formattedValue}</Text>
      </Area>
    );
  },
);

const columns: TableColumns<TaskAttributes> = {
  id: { caption: "ID" },
  title: { caption: "Title" },
  description: {
    caption: "Description",
    cellComponent: DescriptionCell,
  },
};
