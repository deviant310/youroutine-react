import { Entity } from "~/infrastructure/entity";

export class TaskPriority extends Entity<"low" | "medium" | "high"> {
  static options = [
    new TaskPriority("high"),
    new TaskPriority("medium"),
    new TaskPriority("low"),
  ];

  static getInstanceKey(taskPriority: TaskPriority) {
    return taskPriority.$payload;
  }

  static getInstanceLabel(taskPriority: TaskPriority) {
    return taskPriority.label;
  }

  get label() {
    return {
      low: "Low",
      medium: "Medium",
      high: "High",
    }[this.$payload];
  }

  toString() {
    return this.label;
  }
}
