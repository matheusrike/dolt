import type {
	CreateUserInput,
	CreateUserOutput,
} from '@/application/useCases/User/createUser/createUser.dto';
import { CreateUserUseCase } from '@/application/useCases/User/createUser/createUser.usecase';
import { ListUsersUseCase } from '@/application/useCases/User/listUsers/listUsers.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation.pipe';
import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import {
	CreateUserSchema,
	FindByIdSchema,
	UserTaskListsSchem,
} from './user.schema';
import type {
	FindUserByIdInput,
	FindUserByIdOutput,
} from '@/application/useCases/User/findUserById/findUserById.dto';
import { FindUserByIdUseCase } from '@/application/useCases/User/findUserById/findUserById.usecase';
import { UserTaskListsOutput } from '@/application/useCases/User/userTaskLists/userTaskLists.dto';
import { UserTaskListsUsecase } from '@/application/useCases/User/userTaskLists/userTaskLists.usecase';

@Controller('users')
export class UserController {
	constructor(
		private readonly createUserUsecase: CreateUserUseCase,
		private readonly listUsersUsecase: ListUsersUseCase,
		private readonly finduserByIdUsecase: FindUserByIdUseCase,
		private readonly userTaskListsUsecase: UserTaskListsUsecase,
	) {}
	@Post()
	@UsePipes(new ZodValidationPipe(CreateUserSchema))
	async handle(@Body() Body: CreateUserInput): Promise<CreateUserOutput> {
		return await this.createUserUsecase.execute(Body);
	}

	@Get()
	async list() {
		return await this.listUsersUsecase.execute();
	}

	@Get(':id')
	@UsePipes(new ZodValidationPipe(FindByIdSchema))
	async getById(
		@Param() Param: FindUserByIdInput,
	): Promise<FindUserByIdOutput> {
		return await this.finduserByIdUsecase.execute(Param);
	}

	@Get('tasklists/:userId')
	@UsePipes(new ZodValidationPipe(UserTaskListsSchem))
	async getTaskLists(
		@Param() Param: { userId: string },
	): Promise<UserTaskListsOutput[]> {
		return await this.userTaskListsUsecase.execute(Param.userId);
	}
}
