import { InvalidTaskListName, UserIdRequired } from './tasklist.error';

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
			throw new UserIdRequired('User ID is required');
		}
		if (!data.name || data.name.trim() === '') {
			throw new InvalidTaskListName('Name should not be empty');
		}
		return new TaskList({
			...data,
			id,
			createdAt: new Date(),
		});
	}

	static restore(values: TaskListProps): TaskList | null {
		return new TaskList(values);
	}

	changeName(newName: string): void {
		this.tasklistProps.name = newName;
		this.tasklistProps.updatedAt = new Date();
	}

	get Id(): string {
		return this.tasklistProps.id;
	}

	get UserId(): string {
		return this.tasklistProps.userId;
	}

	get Name(): string {
		return this.tasklistProps.name;
	}

	get CreatedAt(): Date {
		return this.tasklistProps.createdAt;
	}

	get UpdatedAt(): Date | undefined {
		return this.tasklistProps.updatedAt;
	}
}
