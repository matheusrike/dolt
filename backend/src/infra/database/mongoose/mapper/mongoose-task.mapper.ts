import { Task } from '@/domain/modules/Task/task.entity';
import { TaskSchema } from '../schemas/mongoose-task.schema';

export class MongooseTaskMapper {
	static toPersistence(task: Task): TaskSchema {
		return {
			_id: task.Id,
			taskListId: task.TaskListId,
			title: task.Title,
			description: task.Description,
			status: task.Status,
			createdAt: task.CreatedAt,
			updatedAt: task.UpdatedAt,
		};
	}

	static toDomain(raw: TaskSchema): Task | null {
		return Task.restore({
			id: raw._id,
			taskListId: raw.taskListId,
			title: raw.title,
			description: raw.description,
			status: raw.status,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
		});
	}
}
