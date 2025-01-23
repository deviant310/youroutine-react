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
import { ProjectAttributes } from "~/concern/general/entities";

import { ProjectCreatePopup, useProjectCreatePopupToggle } from "./popups";

export const ProjectsPage = memo(() => {
  useDocumentTitle("Projects");

  const popupToggle = useProjectCreatePopupToggle();
  const { projects, retrievingProjects } = useProjectsRetrieving();

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        <Area marginBottom={0.8}>
          <Flex justifyContent="between" alignItems="center">
            <Title size={3}>Projects</Title>

            <Button color="primary-light" onClick={popupToggle.setValueOn}>
              Create project
            </Button>
          </Flex>
        </Area>

        {!projects && retrievingProjects && "Loading projects..."}

        {projects && <Table rowsData={projects} columns={columns} />}
      </Area>

      <ProjectCreatePopup />
    </>
  );
});

const columns: TableColumns<ProjectAttributes> = {
  id: { caption: "ID" },
  name: { caption: "Name" },
  description: { caption: "Description" },
};

ProjectsPage.displayName = "ProjectsPage";
