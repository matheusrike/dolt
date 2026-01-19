import { Task } from './task.entity';

export abstract class TaskRepository {
	abstract save(data: Task): Promise<void> | void;
	abstract list(
		taskListId: string,
	): Promise<(Task | null)[]> | (Task | null)[];
}
