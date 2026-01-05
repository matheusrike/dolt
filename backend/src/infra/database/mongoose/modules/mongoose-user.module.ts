import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaFactory } from '../schemas/mongoose-user.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchemaFactory },
		]),
	],
	exports: [MongooseModule],
})
export class MongooseUserModule {}
