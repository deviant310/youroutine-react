import { memo, useMemo, useState } from "react";

import { Grid, Loader, SelectField, Text } from "~/infrastructure/ui";

import { useProjectsRetrieving } from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../handlers";

export const ProjectField = memo(() => {
  const [nameEntry, setNameEntry] = useState("");
  const { getProjectsFilteredByNameEntry } = useProjectsRetrieving();

  const field = useTaskCreateFormField("project");

  /* const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]); */

  const filteredProjects = useMemo(
    () => getProjectsFilteredByNameEntry(nameEntry),
    [getProjectsFilteredByNameEntry, nameEntry],
  );

  if (!field) return;

  const { name, value, error, setValue } = field;

  return (
    <SelectField
      name={name}
      label="Project"
      before={
        <>
          {<Loader size={1.6} />}

          {/* {retrievingProjectsError instanceof Error && (
            <Alert type="error" message="Error retrieving projects" />
          )} */}
        </>
      }
      options={filteredProjects}
      value={value}
      onChange={setValue}
      displayStringForOption={Project.getInstanceName}
      getOptionKey={Project.getInstanceId}
      renderOption={renderProjectFieldOption}
      error={error}
      //onInputBlur={stain}
      searchValue={nameEntry}
      onSearchChange={setNameEntry}
      placeholder="Select project"
      size="auto"
    />
  );
});

const renderProjectFieldOption = ({ name, description }: Project) => (
  <Grid>
    <Text>{name}</Text>

    <Text color="light" size="small">
      {description}
    </Text>
  </Grid>
);
