import { Module } from '@nestjs/common';
import { loadEnvFile } from 'process';

loadEnvFile('.env');

@Module({
	imports: [DatabaseModule],
})
export class DatabaseModule {}
