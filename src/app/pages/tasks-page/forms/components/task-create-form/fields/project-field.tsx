import { memo, useMemo, useState } from "react";

import {
  Grid,
  SelectField,
  SelectInputOptionComponent,
  Text,
} from "~/infrastructure/ui";

import { useProjectsRetrieving } from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../hooks";

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

  if (!filteredProjects) return null;

  return (
    <SelectField
      name={name}
      label="Project"
      options={filteredProjects}
      value={value}
      onChange={setValue}
      displayStringForOption={Project.getInstanceName}
      getOptionKey={Project.getInstanceId}
      optionComponent={ProjectFieldOption}
      error={displayedError}
      onInputBlur={stain}
      textboxValue={nameEntry}
      onTextboxChange={setNameEntry}
      textboxPlaceholder="Select project"
      textboxSize="auto"
    />
  );
};

const ProjectFieldOption: SelectInputOptionComponent<Project> = memo(
  ({ option }) => {
    const { name, description } = option;

    return (
      <Grid>
        <Text>{name}</Text>

        <Text color="light" size="xsmall">
          {description}
        </Text>
      </Grid>
    );
  },
);
