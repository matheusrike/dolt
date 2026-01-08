import { z } from 'zod';

export const CreateUserSchema = z.object({
	name: z.string('Name cannot be null'),
	email: z.email('Invalid e-mail'),
	password: z.string('Password cannot be null'),
});

export const FindByIdSchema = z.object({
	id: z.uuid(),
});

export const UserTaskListsSchem = z.object({
	userId: z.uuid(),
});
