import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessResponseInterceptor } from './interceptors/response.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	const PORT = configService.get<number>('PORT', 3000);

	// Define interceptor para formatar as respostas
	app.useGlobalInterceptors(new SuccessResponseInterceptor());

	await app.listen(PORT).then(() => {
		console.log(`Server is running at: http://localhost:${PORT}`);
	});
}

void bootstrap();
