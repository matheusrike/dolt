import { z } from 'zod';

export const CreateTaskListSchema = z.object({
	userId: z.uuid(),
	name: z.string(),
});

export const FindTaskListByIdSchema = z.object({
	id: z.uuid(),
});

export const ListTasksSchema = z.object({
	id: z.uuid(),
});

export const CreateTaskParamsSchema = z.object({
	id: z.uuid(),
});

export const CreateTaskBodySchema = z.object({
	title: z.string('Title is required'),
	description: z.string().optional(),
});
