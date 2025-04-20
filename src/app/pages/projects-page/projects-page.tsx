import { memo } from "react";

import { combineProviders } from "~/infrastructure/context";

import { PopupsTogglesProvider } from "./popups";
import { ProjectsPageConsumer } from "./projects-page-consumer";

export const ProjectsPage = memo(() => (
  <PageProvider>
    <ProjectsPageConsumer />
  </PageProvider>
));

ProjectsPage.displayName = "ProjectsPage";

const PageProvider = combineProviders(PopupsTogglesProvider);
