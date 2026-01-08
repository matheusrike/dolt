import { z } from 'zod';

export const CreateTaskListSchema = z.object({
	userId: z.uuid(),
	name: z.string(),
});

export const FindTaskListByIdSchema = z.object({
	id: z.uuid(),
});
