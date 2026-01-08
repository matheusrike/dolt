import { TaskListRepository } from '@/domain/repositories/TaskList.repository';
import { UserRepository } from '@/domain/repositories/User.repository';
import {
	CreateTaskListInput,
	CreateTaskListOutput,
} from './createTaskList.dto';
import { TaskList } from '@/domain/TaskList/TaskList.entity';

export class CreateTaskListUseCase {
	constructor(
		private taskListRepository: TaskListRepository,
		private userRepository: UserRepository,
	) {}

	async execute(input: CreateTaskListInput): Promise<CreateTaskListOutput> {
		const user = await this.userRepository.findById(input.userId);
		if (!user) {
			throw new Error('User with this ID not found');
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
