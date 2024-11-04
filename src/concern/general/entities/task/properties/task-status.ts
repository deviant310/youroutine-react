export class TaskStatus {
  static options = [
    new TaskStatus("underway"),
    new TaskStatus("completed"),
    new TaskStatus("rejected"),
  ];

  static getInstanceLabel(taskStatus: TaskStatus) {
    return taskStatus.label;
  }

  constructor(public key: "underway" | "completed" | "rejected") {}

  get label() {
    return {
      underway: "In progress",
      completed: "Completed",
      rejected: "Rejected",
    }[this.key];
  }

  toString() {
    return this.key;
  }
}
