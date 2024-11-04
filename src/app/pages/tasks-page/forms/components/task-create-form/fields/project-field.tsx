import { memo, useMemo, useState } from "react";

import {
  Grid,
  SelectField,
  SelectFieldOptionComponent,
  Text,
  useTheme,
} from "~/infrastructure/ui";

import { useProjectsRetrieving } from "~/concern/common/third-party";
import { Project } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../stores";

export const ProjectField = () => {
  const [searchValue, setSearchValue] = useState("");
  const { projects } = useProjectsRetrieving();

  const { name, value, setValue, error, dirty, stain } =
    useTaskCreateFormField("project");

  const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]);

  const filteredProjects = useMemo(
    () =>
      projects?.filter(project =>
        project.name.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [projects, searchValue],
  );

  if (!filteredProjects) return null;

  return (
    <SelectField
      name={name}
      label="Project"
      options={filteredProjects}
      selectedOption={value}
      setSelectedOption={setValue}
      displayStringForOption={Project.getInstanceName}
      getOptionKey={Project.getInstanceId}
      optionComponent={ProjectFieldOption}
      error={displayedError}
      onContainerBlur={stain}
      textboxValue={searchValue}
      setTextboxValue={setSearchValue}
      textboxPlaceholder="Select project"
      textboxSize="auto"
    />
  );
};

const ProjectFieldOption: SelectFieldOptionComponent<Project> = memo(
  ({ option }) => {
    const { name, description } = option;
    const { colors } = useTheme();

    return (
      <Grid>
        <Text>{name}</Text>

        <Text size="xsmall" color={colors.default[2].filled()}>
          {description}
        </Text>
      </Grid>
    );
  },
);
