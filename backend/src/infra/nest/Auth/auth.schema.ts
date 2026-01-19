import { z } from 'zod';

// Schemas para Register
export const registerBodySchema = z.object({
	name: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(6),
});

export const registerResponseSchema = z.object({
	user: z.object({
		id: z.string(),
		name: z.string(),
		email: z.string().email(),
	}),
	accessToken: z.string(),
	refreshToken: z.string(),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;

// Schemas para Login
export const loginBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const loginResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

export type LoginBody = z.infer<typeof loginBodySchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
