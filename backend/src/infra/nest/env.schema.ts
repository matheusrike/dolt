import { z } from 'zod';

// Schema para validação das variáveis de ambiente
export const envSchema = z.object({
	NODE_ENV: z.enum(
		['development', 'production'],
		'NODE_ENV is required in .env',
	),
	MONGO_URL: z.string('MONGO_URL is required in .env'),
	PORT: z.string().optional(),
	JWT_SECRET: z.string('JWT_SECRET is required in .env'),
	JWT_EXPIRES_IN: z.string('JWT_EXPIRES_IN is required in .env'),
	JWT_REFRESH_SECRET: z.string('JWT_REFRESH_SECRET is required in .env'),
	JWT_REFRESH_EXPIRES_IN: z.string(
		'JWT_REFRESH_EXPIRES_IN is required in .env',
	),
});
