import { Controller, Post, Body, UsePipes, Res } from '@nestjs/common';
import { RegisterUseCase } from '@/application/useCases/Auth/register/register.usecase';
import {
	type RegisterBody,
	registerBodySchema,
	RegisterResponse,
} from './auth.schema';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import express from 'express';

@Controller('auth')
export class AuthController {
	constructor(private readonly registerUseCase: RegisterUseCase) {}

	@Post('register')
	@UsePipes(new ZodValidationPipe(registerBodySchema))
	async register(
		@Body() Body: RegisterBody,
		@Res({ passthrough: true }) res: express.Response,
	): Promise<RegisterResponse> {
		const { accessToken, refreshToken } =
			await this.registerUseCase.execute(Body);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/auth/refresh',
		});

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			path: '/',
		});

		return { accessToken };
	}
}
