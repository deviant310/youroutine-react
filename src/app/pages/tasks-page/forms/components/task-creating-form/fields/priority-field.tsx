import { memo, useMemo } from "react";

import { SelectField } from "~/infrastructure/ui";

import { taskPriorities } from "~/concern/common/data";

import { useTaskCreateFormField } from "../../../handlers";

export const PriorityField = memo(() => {
  // TODO запретить на уровне eslint устанавливать здесь дефолтные значения
  const { name, value, setValue, error, dirty, stain } =
    useTaskCreateFormField("priority");

  const displayedError = useMemo(() => {
    if (dirty) return error;
  }, [dirty, error]);

  return (
    <SelectField
      name={name}
      label="Priority"
      options={taskPriorities.keys()}
      value={value}
      onChange={setValue}
      displayStringForOption={taskPriorities.getValue}
      renderOption={taskPriorities.getValue}
      error={displayedError}
      onInputBlur={stain}
      placeholder="Select priority"
      size="auto"
    />
  );
});
