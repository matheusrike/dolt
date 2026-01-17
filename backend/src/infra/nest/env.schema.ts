import { z } from 'zod';

// Schema para validação das variáveis de ambiente
export const envSchema = z.object({
	MONGO_URL: z.string('MONGO_URL is required in .env'),
	APP_PORT: z.string('APP_PORT is required in .env').optional(),
});
