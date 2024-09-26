export class Task {
  id: number;
  title: string;
  description: string;
  approved: boolean;

  static getInstanceId(task: Task) {
    return task.id;
  }

  static getInstanceTitle(task: Task) {
    return task.title;
  }

  constructor(attributes: { [K in keyof Task]: Task[K] }) {
    this.id = attributes.id;
    this.title = attributes.title;
    this.description = attributes.description;
    this.approved = attributes.approved;
  }
}
