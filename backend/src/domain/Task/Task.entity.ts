enum TaskStatus {
	PENDING = 'PENDING',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED',
}

type TaskProps = {
	readonly id: string;
	readonly listId: string;
	title: string;
	description?: string;
	status: TaskStatus;
	createdAt: Date;
	updatedAt?: Date;
};

type CreateTaskProps = {
	listId: string;
	title: string;
	description: string;
};

export class Task {
	private constructor(private taskProps: TaskProps) {}

	static create(data: CreateTaskProps): Task {
		const id = crypto.randomUUID();
		if (!data.title || data.title.trim() === '') {
			throw new Error('Title is required');
		}
		if (!data.listId) {
			throw new Error('List ID is required');
		}
		return new Task({
			...data,
			id,
			status: TaskStatus.PENDING,
			createdAt: new Date(),
		});
	}

	static restore(values: TaskProps): Task {
		return new Task(values);
	}

	changeStatus(newStatus: TaskStatus): void {
		this.taskProps.status = newStatus;
		this.taskProps.updatedAt = new Date();
	}
}
