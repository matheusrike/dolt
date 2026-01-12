import { Task } from './task.entity';

export interface TaskRepository {
	save(data: Task): Promise<void> | void;
	list(taskListId: string): Promise<(Task | null)[]> | (Task | null)[];
}

export const TASK_REPOSITORY = Symbol('TaskRepository');
export const TaskRepositoryToken = () => TASK_REPOSITORY;
