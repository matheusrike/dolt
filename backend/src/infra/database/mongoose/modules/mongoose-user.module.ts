import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemaFactory } from '../schemas/mongoose-user.schema';
import { MongooseUserRepository } from '../repositories/mongoose-user.repository';
import { UserRepository } from '@/domain/modules/User/user.repository';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: UserSchema.name, schema: UserSchemaFactory },
		]),
	],
	providers: [{ provide: UserRepository, useClass: MongooseUserRepository }],
	exports: [UserRepository],
})
export class MongooseUserModule {}
