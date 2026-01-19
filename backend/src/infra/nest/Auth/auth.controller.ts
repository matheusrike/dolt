import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { RegisterUseCase } from '@/application/useCases/Auth/register/register.usecase';
import {
	type RegisterBody,
	registerBodySchema,
	RegisterResponse,
} from './auth.schema';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
	constructor(private readonly registerUseCase: RegisterUseCase) {}

	@Post('register')
	@UsePipes(new ZodValidationPipe(registerBodySchema))
	async register(@Body() Body: RegisterBody): Promise<RegisterResponse> {
		return this.registerUseCase.execute(Body);
	}
}
