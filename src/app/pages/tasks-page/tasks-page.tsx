import { memo, useCallback } from "react";

import { useTitle } from "~/infrastructure/hooks";
import { useRouter } from "~/infrastructure/router";
import { Area, Paper, Table, TableColumns, Title } from "~/infrastructure/ui";

import { Header } from "~/concern/common/chunks";
import { taskRoute } from "~/concern/common/routes";
import { TaskAttributes } from "~/concern/entities";

export const TasksPage = memo(() => {
  const { navigate } = useRouter();

  const tableData: Array<TaskAttributes> = [
    {
      id: 1,
      title: "First task",
      description: "Very simple task",
      approved: true,
    },
    {
      id: 2,
      title: "Second task",
      description: "Another simple task",
      approved: false,
    },
  ];

  const columns: TableColumns<TaskAttributes> = {
    id: { caption: "ID" },
    title: { caption: "Title" },
    description: { caption: "Description" },
    approved: {
      caption: "Approved",
      cellComponent: ({ value }) => (value ? "Yes" : "No"),
    },
  };

  const onRowClick = useCallback(
    ({ id }: TaskAttributes) => {
      navigate(taskRoute, { id });
    },
    [navigate],
  );

  useTitle("Tasks");

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Title size={2}>Tasks</Title>

        <Paper elevation={1}>
          <Table data={tableData} columns={columns} onRowClick={onRowClick} />
        </Paper>
      </Area>
    </>
  );
});

TasksPage.displayName = "HomePage";
