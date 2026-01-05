import type { CreateUserDTO } from '@/application/useCases/createUser.usecase.ts/createUser.dto';
import { CreateUserUseCase } from '@/application/useCases/createUser.usecase.ts/createUser.usecase';
import { ListUsersUseCase } from '@/application/useCases/listUsers.usecase.ts/listUsers.usecase';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private listUsersUseCase: ListUsersUseCase,
	) {}
	@Post()
	async handle(@Body() Body: CreateUserDTO) {
		await this.createUserUseCase.execute(Body);
	}

	@Get()
	async list() {
		return await this.listUsersUseCase.execute();
	}
}
