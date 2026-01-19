import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema, TaskSchemaFactory } from '../schemas/mongoose-task.schema';
import { TaskRepository } from '@/domain/modules/Task/task.repository';
import { MongooseTaskRepository } from '../repositories/mongoose-task.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TaskSchema.name, schema: TaskSchemaFactory },
		]),
	],
	providers: [{ provide: TaskRepository, useClass: MongooseTaskRepository }],
	exports: [TaskRepository],
})
export class MongooseTaskModule {}
