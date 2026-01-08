import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { loadEnvFile } from 'process';
import { UserModule } from './User/user.module';
import { TaskListModule } from './TaskList/tasklist.module';

loadEnvFile('.env');

@Module({
	imports: [
		MongooseModule.forRoot(process.env.MONGO_URL!),
		UserModule,
		TaskListModule,
	],
})
export class MainModule {}
