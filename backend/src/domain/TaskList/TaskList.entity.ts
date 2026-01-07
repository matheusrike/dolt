type TaskListProps = {
	readonly id: string;
	readonly userId: string;
	name: string;
	createdAt: Date;
	updatedAt?: Date;
};

export class TaskList {
	private constructor(private tasklistProps: TaskListProps) {}

	static create(data: { userId: string; name: string }): TaskList {
		const id = crypto.randomUUID();
		if (!data.userId) {
			throw new Error('User ID is required');
		}
		if (!data.name || data.name.trim() === '') {
			throw new Error('Name should not be empty');
		}
		return new TaskList({
			...data,
			id,
			createdAt: new Date(),
		});
	}

	static restore(values: TaskListProps): TaskList {
		return new TaskList(values);
	}

	changeName(newName: string): void {
		this.tasklistProps.name = newName;
		this.tasklistProps.updatedAt = new Date();
	}
}
