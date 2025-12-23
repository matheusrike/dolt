enum TaskStatus {
  'PENDING',
  'IN_PROGRESS',
  'UNDER_REVIEW',
  'COMPLETED',
}

type TaskOwners = {
  name: string;
  email: string;
};

type TaskComments = {
  username: string;
  message: string;
  date: Date;
};

type TaskProps = {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  owners: TaskOwners[];
  comments: TaskComments[];
};

export class Task {
  private constructor(private taskProps: TaskProps) {}
}
