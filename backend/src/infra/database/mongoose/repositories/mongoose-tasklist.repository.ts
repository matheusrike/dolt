import { TaskListRepository } from '@/domain/repositories/TaskList.repository';
import { TaskList } from '@/domain/TaskList/TaskList.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	TaskListDocument,
	TaskListSchema,
} from '../schemas/mongoose-tasklist.schema';
import { Model } from 'mongoose';
import { MongooseTaskListMapper } from '../mapper/mongoose-tasklist.mapper';

@Injectable()
export class MongooseTaskListRepository implements TaskListRepository {
	constructor(
		@InjectModel(TaskListSchema.name)
		private readonly taskListModel: Model<TaskListDocument>,
	) {}
	async save(data: TaskList): Promise<void> {
		const taskList = MongooseTaskListMapper.toPersistence(data);
		await this.taskListModel.create(taskList);
	}

	async filterByUserId(userId: string): Promise<(TaskList | null)[]> {
		const taskLists = await this.taskListModel.find({ userId });
		return taskLists.map((taskList) =>
			MongooseTaskListMapper.toDomain(taskList),
		);
	}

	async findById(id: string): Promise<TaskList | null> {
		const taskList = await this.taskListModel.findById(id);
		if (!taskList) throw new Error('TaskList with this id not found');
		return MongooseTaskListMapper.toDomain(taskList);
	}
}
