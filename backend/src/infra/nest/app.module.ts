import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { TaskListModule } from './TaskList/tasklist.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from './env.schema';
import { z } from 'zod';

@Module({
	imports: [
		// Carrega as variáveis de ambiente vindas do arquivo .env e as disponibiliza via ConfigService
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',

			// Valida as variáveis de ambiente usando o zod
			validate: (env) => {
				const parsed = envSchema.safeParse(env);

				if (!parsed.success)
					throw new Error(
						'Invalid .env file\n' +
							z.prettifyError(parsed.error) +
							'\n',
					);

				return parsed.data;
			},
		}),

		// Configuração do mongoose usando as variáveis de ambiente vindas do ConfigService
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URL'),
			}),
		}),

		// Módulos de domínio
		UserModule,
		TaskListModule,
	],
})
export class AppModule {}
