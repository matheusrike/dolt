import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//Declara o schema do refresh token
@Schema({ collection: 'refreshToken', timestamps: true })
export class RefreshTokenSchema {
	@Prop({ type: String })
	_id: string;

	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	token: string;

	@Prop({ required: true })
	expiresAt: Date;

	@Prop({ required: true })
	createdAt: Date;

	@Prop({ type: Date })
	updatedAt?: Date;
}

// Exporta o schema para uso no modulo
export type RefreshTokenDocument = HydratedDocument<RefreshTokenSchema>;
export const RefreshTokenSchemaFactory =
	SchemaFactory.createForClass(RefreshTokenSchema);
