import { memo } from "react";

import { useDocumentTitle } from "~/react";

import {
  Area,
  Button,
  Flex,
  Grid,
  Table,
  TableColumns,
  Text,
} from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { useProjectsRetrieving } from "~/concern/common/third-party";
import { ProjectAttributes } from "~/concern/general/entities";

import { ProjectCreatePopup, useProjectCreatePopupToggle } from "./popups";

export const ProjectsPage = memo(() => {
  useDocumentTitle("Projects");

  const { turnOn } = useProjectCreatePopupToggle();
  const { projects, retrievingProjects } = useProjectsRetrieving();

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px" marginBottom={4.4}>
        <Grid gap={2}>
          <Flex justifyContent="between" alignItems="center">
            <Text size="huge" weight="semibold">
              Projects
            </Text>

            <Button color="primary-light" onClick={turnOn}>
              Create project
            </Button>
          </Flex>

          {!projects && retrievingProjects && "Loading projects..."}

          {projects && <Table rowsData={projects} columns={columns} />}
        </Grid>
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
