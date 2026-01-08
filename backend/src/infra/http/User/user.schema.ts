import { z } from 'zod';

export const CreateUserSchema = z.object({
	name: z.string(),
	email: z.email('Invalid e-mail'),
	password: z.string(),
});

export const FindByIdSchema = z.object({
	id: z.uuid(),
});

export const UserTaskListsSchem = z.object({
	userId: z.uuid(),
});
