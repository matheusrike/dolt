import { TaskListRepository } from '@/domain/repositories/TaskList.repository';
import { UserRepository } from '@/domain/repositories/User.repository';
import { UserTaskListsOutput } from './userTaskLists.dto';

export class UserTaskListsUsecase {
	constructor(
		private taskListRepository: TaskListRepository,
		private userRepository: UserRepository,
	) {}

	async execute(userId: string): Promise<UserTaskListsOutput[]> {
		const user = await this.userRepository.findById(userId);
		if (!user) throw new Error('User with this ID not found');

		const taskLists = await this.taskListRepository.filterByUserId(user.Id);

		return taskLists.map((tasklist) => ({
			id: tasklist!.Id,
			name: tasklist!.Name,
			createdAt: tasklist!.CreatedAt,
			updatedAt: tasklist!.UpdatedAt,
		}));
	}
}
