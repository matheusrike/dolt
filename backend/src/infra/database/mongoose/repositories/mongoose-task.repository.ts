import { TaskRepository } from '@/domain/modules/Task/task.repository';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, TaskSchema } from '../schemas/mongoose-task.schema';
import { Model } from 'mongoose';
import { Task } from '@/domain/modules/Task/task.entity';
import { MongooseTaskMapper } from '../mapper/mongoose-task.mapper';

export class MongooseTaskRepository implements TaskRepository {
	constructor(
		@InjectModel(TaskSchema.name)
		private readonly taskModel: Model<TaskDocument>,
	) {}

	async save(data: Task): Promise<void> {
		const task = MongooseTaskMapper.toPersistence(data);
		await this.taskModel.create(task);
	}

	async list(taskListId: string): Promise<(Task | null)[]> {
		const tasks = await this.taskModel.find({ taskListId });

		return tasks.map((task) => MongooseTaskMapper.toDomain(task));
	}
}
