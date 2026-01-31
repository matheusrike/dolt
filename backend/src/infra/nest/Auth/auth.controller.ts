import { Controller, Post, Body, UsePipes, Res } from '@nestjs/common';
import { RegisterUseCase } from '@/application/useCases/Auth/register/register.usecase';
import {
	type LoginBody,
	loginBodySchema,
	LoginResponse,
	type RegisterBody,
	registerBodySchema,
	RegisterResponse,
} from './auth.schema';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import express from 'express';
import { LoginUseCase } from '@/application/useCases/Auth/login/login.usecase';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly registerUseCase: RegisterUseCase,
		private readonly loginUseCase: LoginUseCase,
	) {}

	@Post('register')
	@UsePipes(new ZodValidationPipe(registerBodySchema))
	async register(
		@Body() Body: RegisterBody,
		@Res({ passthrough: true }) res: express.Response,
	): Promise<RegisterResponse> {
		const { user, accessToken, refreshToken } =
			await this.registerUseCase.execute(Body);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/auth/refresh',
		});

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			path: '/',
		});

		return { user, accessToken };
	}

	@Post('login')
	@UsePipes(new ZodValidationPipe(loginBodySchema))
	async login(
		@Body() Body: LoginBody,
		@Res({ passthrough: true }) res: express.Response,
	): Promise<LoginResponse> {
		const { refreshToken, accessToken } =
			await this.loginUseCase.execute(Body);

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
