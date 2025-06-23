import { memo, useState } from "react";

import { SelectField } from "~/infrastructure/ui";

import { useAssigneesRetrieving } from "~/concern/common/third-party";
import { Assignee } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../handlers";

export const AssigneeField = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const field = useTaskCreateFormField("assignee");
  const { assignees, retrievingAssignees, retrievingAssigneesError } =
    useAssigneesRetrieving(field && searchQuery);

  if (!field) return null;

  const { name, value, setValue, error } = field;

  return (
    <SelectField
      name={name}
      label="Assignee"
      options={assignees}
      value={value}
      onChange={setValue}
      displayStringForOption={Assignee.getInstanceName}
      getOptionKey={Assignee.getInstanceId}
      error={error}
      loadingOptions={retrievingAssignees}
      loadingOptionsError={retrievingAssigneesError}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      placeholder="Select assignee"
      size="auto"
    />
  );
});
