import { TaskList } from './taskList.entity';

export abstract class TaskListRepository {
	abstract save(data: TaskList): Promise<void> | void;
	abstract findById(id: string): Promise<TaskList | null> | TaskList | null;
	abstract filterByUserId(
		userId: string,
	): Promise<(TaskList | null)[]> | (TaskList | null)[];
}
