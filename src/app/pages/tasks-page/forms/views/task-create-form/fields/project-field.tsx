import { memo, useState } from "react";

import { Grid, SelectField, Text } from "~/infrastructure/ui";

import { useProjectsRetrieving } from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../handlers";

export const ProjectField = memo(() => {
  const [nameEntry, setNameEntry] = useState("");
  const { projects, retrievingProjects, retrievingProjectsError } =
    useProjectsRetrieving(nameEntry);

  const field = useTaskCreateFormField("project");

  /* const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]); */

  if (!field) return;

  const { name, value, error, setValue } = field;

  return (
    <SelectField
      name={name}
      label="Project"
      options={projects}
      value={value}
      onChange={setValue}
      displayStringForOption={Project.getInstanceName}
      getOptionKey={Project.getInstanceId}
      renderOption={renderProjectFieldOption}
      error={error}
      loadingOptions={retrievingProjects}
      loadingOptionsError={retrievingProjectsError}
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
