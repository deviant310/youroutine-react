import { memo, useMemo } from "react";

import { SelectField, SelectFieldOptionComponent } from "~/infrastructure/ui";

import { TaskPriority } from "~/concern/general/entities";

import { useTaskCreateFormField } from "../../../stores";

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
      displayStringForOption={TaskPriority.getInstanceLabel}
      optionComponent={PriorityFieldOption}
      error={displayedError}
      onContainerBlur={stain}
      textboxPlaceholder="Select priority"
      textboxSize="auto"
    />
  );
};

const PriorityFieldOption: SelectFieldOptionComponent<TaskPriority> = memo(
  ({ option: priority }) => priority.label,
);
