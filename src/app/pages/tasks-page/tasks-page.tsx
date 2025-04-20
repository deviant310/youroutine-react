import { memo } from "react";

import { combineProviders } from "~/infrastructure/context";

import { TaskCreateFormProvider } from "./forms";
import { PopupsTogglesProvider } from "./popups";
import { TasksPageConsumer } from "./tasks-page-consumer";

export const TasksPage = memo(() => (
  <PageProvider>
    <TasksPageConsumer />
  </PageProvider>
));

TasksPage.displayName = "TasksPage";

const PageProvider = combineProviders(
  PopupsTogglesProvider,
  TaskCreateFormProvider,
);
