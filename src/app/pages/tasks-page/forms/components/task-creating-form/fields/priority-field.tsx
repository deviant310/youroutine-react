import { memo, useMemo } from "react";

import { SelectField, SelectInputOptionComponent } from "~/infrastructure/ui";

import { TaskPriority } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../handlers";

export const PriorityField = () => {
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
      options={TaskPriority.options}
      value={value}
      onChange={setValue}
      getOptionKey={TaskPriority.getInstanceKey}
      displayStringForOption={TaskPriority.getInstanceLabel}
      optionComponent={PriorityFieldOption}
      error={displayedError}
      onInputBlur={stain}
      textboxPlaceholder="Select priority"
      textboxSize="auto"
    />
  );
};

const PriorityFieldOption: SelectInputOptionComponent<TaskPriority> = memo(
  ({ option: priority }) => priority.label,
);
