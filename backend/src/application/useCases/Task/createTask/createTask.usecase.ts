import { TaskRepository } from '@/domain/modules/Task/task.repository';
import { TaskListRepository } from '@/domain/modules/TaskList/taskList.repository';
import { CreateTaskInput, CreateTaskOutput } from './createTask.dto';
import { Task } from '@/domain/modules/Task/task.entity';
import { TaskListNotFound } from '@/application/shared/usecase.error';

export class CreateTaskUsecase {
	constructor(
		private readonly taskRepository: TaskRepository,
		private readonly taskListRepository: TaskListRepository,
	) {}

	async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
		const taskList = await this.taskListRepository.findById(
			input.taskListId,
		);
		if (!taskList) {
			throw new TaskListNotFound('TaskList with this ID not found');
		}
		const newTask = Task.create({ ...input, taskListId: taskList.Id });
		await this.taskRepository.save(newTask);

		return {
			id: newTask.Id,
			title: newTask.Title,
			description: newTask.Description,
		};
	}
}
