import { TaskList } from '@/domain/modules/TaskList/taskList.entity';
import { TaskListSchema } from '../schemas/mongoose-tasklist.schema';

export class MongooseTaskListMapper {
	static toPersistence(taskList: TaskList) {
		return {
			_id: taskList.Id,
			userId: taskList.UserId,
			name: taskList.Name,
			createdAt: taskList.CreatedAt,
			updatedAt: taskList.UpdatedAt,
		};
	}

	static toDomain(raw: TaskListSchema | null): TaskList | null {
		if (!raw) {
			return null;
		}
		return TaskList.restore({
			id: raw._id,
			userId: raw.userId,
			name: raw.name,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		});
	}
}
