import type { CreateUserInput } from '@/application/useCases/createUser.usecase.ts/createUser.dto';
import { CreateUserUseCase } from '@/application/useCases/createUser.usecase.ts/createUser.usecase';
import { ListUsersUseCase } from '@/application/useCases/listUsers.usecase.ts/listUsers.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { CreateUserSchema } from './user.schema';

@Controller('users')
export class UserController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private listUsersUseCase: ListUsersUseCase,
	) {}
	@Post()
	@UsePipes(new ZodValidationPipe(CreateUserSchema))
	async handle(@Body() Body: CreateUserInput) {
		return await this.createUserUseCase.execute(Body);
	}

	@Get()
	async list() {
		return await this.listUsersUseCase.execute();
	}
}
