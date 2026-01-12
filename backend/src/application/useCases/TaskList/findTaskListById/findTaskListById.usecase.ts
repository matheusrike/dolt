import { TaskListRepository } from '@/domain/modules/TaskList/taskList.repository';
import { FindTaskListByIdOutput } from './findTaskListById.dto';
import { TaskListNotFound } from '@/application/shared/usecase.error';

export class FindTaskListByIdUsecase {
	constructor(private readonly taskListRepository: TaskListRepository) {}

	async execute(id: string): Promise<FindTaskListByIdOutput> {
		const taskList = await this.taskListRepository.findById(id);
		if (!taskList) throw new TaskListNotFound('TaskList not found');
		return {
			id: taskList.Id,
			name: taskList.Name,
			createdAt: taskList.CreatedAt,
			updatedAt: taskList.UpdatedAt,
		};
	}
}
