import { memo } from "react";

import { useDocumentTitle } from "~/react";

import { Area } from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { useTaskRetrieving } from "~/concern/common/third-party";

import { TaskProvider, usePathParams } from "./context";
import { TaskConsumer } from "./task-consumer";

export const TaskPage = memo(() => {
  const { taskId } = usePathParams();
  const { task, retrievingTask, retrievingTaskError } =
    useTaskRetrieving(taskId);

  useDocumentTitle(`Task ${taskId}`);

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        {/* TODO Blocking rendering */}
        {!task && retrievingTask && "Loading task..."}

        {retrievingTaskError instanceof Error && retrievingTaskError.message}

        {task && (
          <TaskProvider task={task}>
            <TaskConsumer />
          </TaskProvider>
        )}
      </Area>
    </>
  );
});
