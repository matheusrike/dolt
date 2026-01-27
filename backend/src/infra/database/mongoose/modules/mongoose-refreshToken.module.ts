import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
	RefreshTokenSchema,
	RefreshTokenSchemaFactory,
} from '../schemas/mongoose-refreshToken.schema';
import { RefreshTokenRepository } from '@/infra/nest/Auth/refreshToken.repository';
import { MongooseRefreshTokenRepository } from '../repositories/mongoose-refreshToken.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: RefreshTokenSchema.name,
				schema: RefreshTokenSchemaFactory,
			},
		]),
	],
	providers: [
		MongooseRefreshTokenRepository,
		{
			provide: RefreshTokenRepository,
			useClass: MongooseRefreshTokenRepository,
		},
	],
	exports: [RefreshTokenRepository],
})
export class MongooseRefreshTokenModule {}
