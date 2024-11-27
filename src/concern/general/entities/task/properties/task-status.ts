import { Entity } from "~/infrastructure/entity";

export class TaskStatus extends Entity<"underway" | "completed" | "rejected"> {
  static options = [
    new TaskStatus("underway"),
    new TaskStatus("completed"),
    new TaskStatus("rejected"),
  ];

  static getInstanceKey(taskStatus: TaskStatus) {
    return taskStatus.$payload;
  }

  static getInstanceLabel(taskStatus: TaskStatus) {
    return taskStatus.label;
  }

  get label() {
    return {
      underway: "In progress",
      completed: "Completed",
      rejected: "Rejected",
    }[this.$payload];
  }

  toString() {
    return this.label;
  }
}
