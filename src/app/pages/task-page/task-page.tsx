import { memo } from "react";

import { useDocumentTitle } from "~/react";

import { combineProviders } from "~/infrastructure/context";
import { Area } from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { useTaskRetrieving } from "~/concern/common/third-party";

import { TaskProvider, usePathParams } from "./providers";
import { TaskPageConsumer } from "./task-page-consumer";

export const TaskPage = memo(() => {
  const { taskId } = usePathParams();
  const { task, retrievingTask, retrievingTaskError } =
    useTaskRetrieving(taskId);

  useDocumentTitle(`Task ${taskId}`);

  return (
    <PageProvider>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        {/* TODO Blocking rendering */}
        {!task && retrievingTask && "Loading task..."}

        {retrievingTaskError instanceof Error && retrievingTaskError.message}

        {task && (
          <TaskProvider value={task}>
            <TaskPageConsumer />
          </TaskProvider>
        )}
      </Area>
    </PageProvider>
  );
});

TaskPage.displayName = "TaskPage";

const PageProvider = combineProviders();
