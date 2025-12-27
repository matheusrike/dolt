export class TaskOwners {
  private constructor(
    private readonly values: { username: string; email: string },
  ) {}

  static create(data: { username: string; email: string }): TaskOwners {
    if (!data.username || data.username.trim().length === 0) {
      throw new Error();
    }
    if (!data.email || data.email.trim().length === 0) {
      throw new Error();
    }
    return new TaskOwners(data);
  }

  static restore(values: { username: string; email: string }): TaskOwners {
    return new TaskOwners(values);
  }
}
