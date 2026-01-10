import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
	TaskListSchema,
	TaskListSchemaFactory,
} from '../schemas/mongoose-tasklist.schema';
import { TASKLIST_REPOSITORY } from '@/domain/modules/TaskList/taskList.repository';
import { MongooseTaskListRepository } from '../repositories/mongoose-tasklist.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskListSchema.name, schema: TaskListSchemaFactory },
		]),
	],
	providers: [
		{ provide: TASKLIST_REPOSITORY, useClass: MongooseTaskListRepository },
	],
	exports: [TASKLIST_REPOSITORY],
})
export class MongooseTaskListModule {}
