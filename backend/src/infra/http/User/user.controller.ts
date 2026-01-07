import type { CreateUserInput } from '@/application/useCases/User/createUser/createUser.dto';
import { CreateUserUseCase } from '@/application/useCases/User/createUser/createUser.usecase';
import { ListUsersUseCase } from '@/application/useCases/User/listUsers/listUsers.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CreateUserSchema, FindByIdSchema } from './user.schema';
import { FindUserByIdInput } from '@/application/useCases/User/findUserById/findUserById.dto';
import { FindUserByIdUseCase } from '@/application/useCases/User/findUserById/findUserById.usecase';

@Controller('users')
export class UserController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private listUsersUseCase: ListUsersUseCase,
		private finduserById: FindUserByIdUseCase,
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

	@Get(':id')
	@UsePipes(new ZodValidationPipe(FindByIdSchema))
	async getById(@Param() Param: FindUserByIdInput) {
		return await this.finduserById.execute(Param);
	}
}
