import { TaskComments } from './TaskComments/TaskComments.vo';
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
  readonly owners: TaskOwners[];
  readonly comments: TaskComments[];
};

type CreateTaskProps = {
  projectId: string;
  title: string;
  owners: TaskOwners[];
};

export class Task {
  private constructor(private taskProps: TaskProps) {}

  static create(data: CreateTaskProps) {
    const id = crypto.randomUUID();
    return new Task({
      id: id as string,
      status: TaskStatus.PENDING,
      comments: [],
      ...data,
    });
  }

  static restore(values: TaskProps) {
    return new Task(values);
  }

  addComment(value: TaskComments) {
    if (this.taskProps.status === TaskStatus.COMPLETED) {
      throw new Error('Cannot comment on completed task');
    }
    this.taskProps.comments.push(value);
  }
}
