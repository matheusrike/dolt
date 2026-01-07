import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'User', timestamps: true })
export class UserSchema {
	@Prop({ type: String })
	_id: string;
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ required: true })
	isActive: boolean;
}

export type UserDocument = HydratedDocument<UserSchema>;
export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema);
