import { symbol } from 'zod';
import { TaskList } from '../TaskList/TaskList.entity';

export interface TaskListRepository {
	save(data: TaskList): Promise<void> | void;
	findById(id: string): Promise<TaskList | null> | TaskList | null;
	filterByUserId(
		userId: string,
	): Promise<(TaskList | null)[]> | (TaskList | null)[];
}

export const TASKLIST_REPOSITORY = symbol('TaskListRepository');

export const TaskListRepositoryToken = () => TASKLIST_REPOSITORY;
