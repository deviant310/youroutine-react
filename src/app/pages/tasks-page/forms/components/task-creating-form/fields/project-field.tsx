import { useMemo, useState } from "react";

import { Grid, SelectField, Text } from "~/infrastructure/ui";

import { useProjectsRetrieving } from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../handlers";

export const ProjectField = () => {
  const [nameEntry, setNameEntry] = useState("");
  const { getProjectsFilteredByNameEntry } = useProjectsRetrieving();

  const { name, value, setValue, error, dirty, stain } =
    useTaskCreateFormField("project");

  const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]);

  const filteredProjects = useMemo(
    () => getProjectsFilteredByNameEntry(nameEntry),
    [getProjectsFilteredByNameEntry, nameEntry],
  );

  return (
    <SelectField
      name={name}
      label="Project"
      options={filteredProjects}
      value={value}
      onChange={setValue}
      displayStringForOption={Project.getInstanceName}
      getOptionKey={Project.getInstanceId}
      renderOption={renderProjectFieldOption}
      error={displayedError}
      onInputBlur={stain}
      textboxValue={nameEntry}
      onTextboxChange={setNameEntry}
      textboxPlaceholder="Select project"
      textboxSize="auto"
    />
  );
};

const renderProjectFieldOption = ({ name, description }: Project) => (
  <Grid>
    <Text>{name}</Text>

    <Text color="light" size="small">
      {description}
    </Text>
  </Grid>
);
