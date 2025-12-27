export class TaskComments {
  private constructor(
    private readonly values: {
      username: string;
      message: string;
      date: Date;
    },
  ) {}

  static create(data: { username: string; message: string }): TaskComments {
    if (!data.username || data.username.trim().length === 0) {
      throw new Error('Invalid username');
    }
    if (!data.message || data.username.trim().length === 0) {
      throw new Error();
    }
    const date = new Date();
    return new TaskComments({ ...data, date });
  }
  static restore(values: {
    username: string;
    message: string;
    date: Date;
  }): TaskComments {
    return new TaskComments(values);
  }
}
