import { TaskRepository } from '@/domain/modules/Task/task.repository';
import { TaskListRepository } from '@/domain/modules/TaskList/taskList.repository';
import { ListTasksInput, ListTasksOutput } from './listTasks.dto';
import { TaskListNotFound } from '@/application/shared/usecase.error';

export class ListTasksUseCase {
	constructor(
		private readonly taskListRepository: TaskListRepository,
		private readonly taskRepositor: TaskRepository,
	) {}

	async execute(input: ListTasksInput): Promise<ListTasksOutput> {
		const taskList = await this.taskListRepository.findById(
			input.taskListId,
		);

		if (!taskList) {
			throw new TaskListNotFound('TaskList not found');
		}

		const tasks = await this.taskRepositor.list(taskList.Id);

		return tasks.map((task) => ({
			id: task!.Id,
			title: task!.Title,
			description: task!.Description,
		}));
	}
}
