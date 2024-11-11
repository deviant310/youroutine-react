import { memo } from "react";

import { useDocumentTitle } from "~/react";

import {
  Area,
  Button,
  Flex,
  Table,
  TableColumns,
  Title,
} from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { useProjectsRetrieving } from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";

import { ProjectCreatePopup, useProjectCreatePopupToggle } from "./popups";

export const ProjectsPage = memo(() => {
  useDocumentTitle("Projects");

  const { turnProjectCreatePopupToggleOn } = useProjectCreatePopupToggle();
  const { projects, retrievingProjects } = useProjectsRetrieving();

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Area marginBottom={0.8}>
          <Flex justifyContent="between" alignItems="center">
            <Title size={3}>Projects</Title>

            <Button
              color="primary-light"
              onClick={turnProjectCreatePopupToggleOn}
            >
              Create project
            </Button>
          </Flex>
        </Area>

        {!projects && retrievingProjects && "Loading projects..."}

        {projects && <Table data={projects} columns={columns} />}
      </Area>

      <ProjectCreatePopup />
    </>
  );
});

const columns: TableColumns<Project> = {
  id: { caption: "ID" },
  name: { caption: "Name" },
  description: { caption: "Description" },
};

ProjectsPage.displayName = "ProjectsPage";
