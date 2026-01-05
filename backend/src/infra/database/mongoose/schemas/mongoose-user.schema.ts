import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'User', timestamps: true })
export class UserSchema extends Document {
	@Prop({ required: true, unique: true })
	id: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ required: true })
	isActive: boolean;
}

export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
// const UserSchema = new Schema(
// 	{
// 		_id: { type: String, required: true },
// 		name: { type: String, required: true },
// 		email: { type: String, required: true, unique: true },
// 		passwordHash: { type: String, required: true },
// 		isActive: { type: Boolean, default: true },
// 	},
// 	{ versionKey: false },
// );
