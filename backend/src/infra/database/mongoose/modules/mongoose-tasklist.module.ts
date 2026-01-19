import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
	TaskListSchema,
	TaskListSchemaFactory,
} from '../schemas/mongoose-tasklist.schema';
import { TaskListRepository } from '@/domain/modules/TaskList/taskList.repository';
import { MongooseTaskListRepository } from '../repositories/mongoose-tasklist.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskListSchema.name, schema: TaskListSchemaFactory },
		]),
	],
	providers: [
		{ provide: TaskListRepository, useClass: MongooseTaskListRepository },
	],
	exports: [TaskListRepository],
})
export class MongooseTaskListModule {}
