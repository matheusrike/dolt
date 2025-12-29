export class TaskOwners {
  private constructor(
    private readonly values: { username: string; email: string },
  ) {}

  static create(
    data: Array<{ username: string; email: string }>,
  ): TaskOwners[] {
    const owners: TaskOwners[] = [];
    data.forEach((owner) => {
      {
        if (!owner.username || owner.username.trim().length === 0) {
          throw new Error();
        }
        if (!owner.email || owner.email.trim().length === 0) {
          throw new Error();
        }
        owners.push(new TaskOwners(owner));
      }
    });
    return owners;
  }

  static restore(
    values: Array<{ username: string; email: string }>,
  ): TaskOwners[] {
    const owners: TaskOwners[] = [];
    values.forEach((owner) => {
      owners.push(new TaskOwners(owner));
    });
    return owners;
  }
}
