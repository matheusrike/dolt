import { TaskListRepository } from '@/domain/modules/TaskList/taskList.repository';
import { UserRepository } from '@/domain/modules/User/user.repository';
import {
	CreateTaskListInput,
	CreateTaskListOutput,
} from './createTaskList.dto';
import { TaskList } from '@/domain/modules/TaskList/taskList.entity';
import { UserNotFound } from '@/application/shared/usecase.error';

export class CreateTaskListUseCase {
	constructor(
		private taskListRepository: TaskListRepository,
		private userRepository: UserRepository,
	) {}

	async execute(input: CreateTaskListInput): Promise<CreateTaskListOutput> {
		const user = await this.userRepository.findById(input.userId);
		if (!user) {
			throw new UserNotFound('User with this ID not found');
		}
		const newTaskList = TaskList.create({
			userId: user.Id,
			name: input.name,
		});
		await this.taskListRepository.save(newTaskList);

		return {
			id: newTaskList.Id,
			name: newTaskList.Name,
			createdAt: newTaskList.CreatedAt,
		};
	}
}
