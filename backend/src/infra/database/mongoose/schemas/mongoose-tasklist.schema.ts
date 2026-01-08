import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'TaskList', timestamps: true })
export class TaskListSchema {
	@Prop({ type: String })
	_id: string;

	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	createdAt: Date;

	@Prop({ type: Date, required: false })
	updatedAt: Date;
}

export type TaskListDocument = HydratedDocument<TaskListSchema>;
export const TaskListSchemaFactory =
	SchemaFactory.createForClass(TaskListSchema);
