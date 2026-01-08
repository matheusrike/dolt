import { TaskList } from '../TaskList/tasklist.entity';

export interface TaskListRepository {
	save(data: TaskList): Promise<void> | void;
	findById(id: string): Promise<TaskList | null> | TaskList | null;
	filterByUserId(
		userId: string,
	): Promise<(TaskList | null)[]> | (TaskList | null)[];
}

export const TASKLIST_REPOSITORY = Symbol('TaskListRepository');

export const TaskListRepositoryToken = () => TASKLIST_REPOSITORY;
