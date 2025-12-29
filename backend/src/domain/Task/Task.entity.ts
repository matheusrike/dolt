import { TaskOwners } from './TaskOwners/TaskOwners.vo';

enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  UNDER_REVIEW = 'UNDER_REVIEW',
  COMPLETED = 'COMPLETED',
}

type TaskProps = {
  readonly id: string;
  readonly projectId: string;
  title: string;
  status: TaskStatus;
  owners: TaskOwners[];
};

type CreateTaskProps = {
  projectId: string;
  title: string;
  owners: Array<{ username: string; email: string }>;
};

export class Task {
  private constructor(private taskProps: TaskProps) {}

  static create(data: CreateTaskProps) {
    const id = crypto.randomUUID();
    const owners = TaskOwners.create(data.owners);
    return new Task({
      ...data,
      id,
      status: TaskStatus.PENDING,
      owners,
    });
  }

  static restore(values: TaskProps) {
    return new Task(values);
  }

  addOwner(owners: Array<{ username: string; email: string }>) {
    this.taskProps.owners.push(...TaskOwners.create(owners));
  }
}
