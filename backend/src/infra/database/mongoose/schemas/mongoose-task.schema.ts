import { TaskStatus } from '@/domain/modules/Task/task.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'Task', timestamps: true })
export class TaskSchema {
	@Prop({ type: String })
	_id: string;

	@Prop({ required: true })
	taskListId: string;

	@Prop({ required: true })
	title: string;

	@Prop({ type: String })
	description?: string;

	@Prop({
		enum: [
			TaskStatus.PENDING,
			TaskStatus.IN_PROGRESS,
			TaskStatus.COMPLETED,
		],
	})
	status: TaskStatus;

	@Prop({ required: true })
	createdAt: Date;

	@Prop({ type: Date })
	updatedAt?: Date;
}

export type TaskDocument = HydratedDocument<TaskSchema>;
export const TaskSchemaFactory = SchemaFactory.createForClass(TaskSchema);
