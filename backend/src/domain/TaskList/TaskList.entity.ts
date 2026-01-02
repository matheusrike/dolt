type TaskListProps = {
  readonly id: string;
  readonly userId: string;
  name: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class TaskList {
  private constructor(private tasklistProps: TaskListProps) {}

  static create(data: { userId: string; name: string }) {
    const id = crypto.randomUUID();
    if (!data.userId) {
      throw new Error('User ID is required');
    }
    const createdAt = new Date();
    return new TaskList({
      ...data,
      id,
      createdAt,
    });
  }

  static restore(values: TaskListProps) {
    return new TaskList(values);
  }

  changeName(newName: string) {
    this.tasklistProps.name = newName;
    this.tasklistProps.updatedAt = new Date();
  }
}
