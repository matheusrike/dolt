import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//Declara o schema do refresh token
@Schema({ collection: 'refreshToken', timestamps: true })
export class RefreshTokenSchema {
	@Prop({ required: true })
	userId: string;

	@Prop({ required: true })
	token: string;

	@Prop({ required: true })
	expiresAt: Date;
}

// Exporta o schema para uso no modulo
export type RefreshTokenDocument = HydratedDocument<RefreshTokenSchema>;
export const RefreshTokenSchemaFactory =
	SchemaFactory.createForClass(RefreshTokenSchema);
