export class TaskPriority {
  static options = [
    new TaskPriority("high"),
    new TaskPriority("medium"),
    new TaskPriority("low"),
  ];

  static getInstanceLabel(taskPriority: TaskPriority) {
    return taskPriority.label;
  }

  constructor(public key: "low" | "medium" | "high") {}

  get label() {
    return {
      low: "Low",
      medium: "Medium",
      high: "High",
    }[this.key];
  }

  toString() {
    return this.key;
  }
}
