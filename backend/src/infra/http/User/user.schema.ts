import { z } from 'zod';

export const CreateUserSchema = z.object({
	name: z.string(),
	email: z.email('Invalid e-mail'),
	password: z.string(),
});
