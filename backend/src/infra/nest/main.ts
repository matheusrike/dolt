import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { SuccessResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(MainModule);
	const PORT = process.env.PORT ?? 3000;

	app.useGlobalInterceptors(new SuccessResponseInterceptor());

	await app.listen(PORT).then(() => {
		console.log(`Server is running at: http://localhost:${PORT}`);
	});
}

void bootstrap();
