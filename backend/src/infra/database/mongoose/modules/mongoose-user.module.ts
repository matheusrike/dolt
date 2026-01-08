import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaFactory } from '../schemas/mongoose-user.schema';
import { MongooseUserRepository } from '../repositories/mongoose-user.repository';
import { USER_REPOSITORY } from '@/domain/repositories/User.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: UserSchema.name, schema: UserSchemaFactory },
		]),
	],
	providers: [{ provide: USER_REPOSITORY, useClass: MongooseUserRepository }],
	exports: [USER_REPOSITORY],
})
export class MongooseUserModule {}
