import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { loadEnvFile } from 'process';

loadEnvFile('.env');

@Module({
	imports: [MongooseModule.forRoot(process.env.MONGO_URL!)],
})
export class MainModule {}
