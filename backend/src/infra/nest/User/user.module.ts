import { CreateUserUseCase } from '@/application/useCases/User/createUser/createUser.usecase';
import {
	USER_REPOSITORY,
	UserRepository,
} from '@/domain/modules/User/user.repository';
import {
	PASSWORD_HASHER,
	PasswordHasher,
} from '@/domain/modules/User/ports/passwordHasher';
import { MongooseUserModule } from '@/infra/database/mongoose/modules/mongoose-user.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { BcryptModule } from '@/infra/services/bcrypt.module';
import { ListUsersUseCase } from '@/application/useCases/User/listUsers/listUsers.usecase';
import { FindUserByIdUseCase } from '@/application/useCases/User/findUserById/findUserById.usecase';
import { UserTaskListsUsecase } from '@/application/useCases/User/userTaskLists/userTaskLists.usecase';
import {
	TASKLIST_REPOSITORY,
	TaskListRepository,
} from '@/domain/modules/TaskList/taskList.repository';
import { MongooseTaskListModule } from '@/infra/database/mongoose/modules/mongoose-tasklist.module';

@Module({
	imports: [MongooseUserModule, MongooseTaskListModule, BcryptModule],
	providers: [
		{
			provide: CreateUserUseCase,
			useFactory: (
				userRepository: UserRepository,
				passwordHasher: PasswordHasher,
			) => {
				return new CreateUserUseCase(userRepository, passwordHasher);
			},
			inject: [USER_REPOSITORY, PASSWORD_HASHER],
		},
		{
			provide: ListUsersUseCase,
			useFactory: (userRepository: UserRepository) => {
				return new ListUsersUseCase(userRepository);
			},
			inject: [USER_REPOSITORY],
		},
		{
			provide: FindUserByIdUseCase,
			useFactory: (userRepository: UserRepository) => {
				return new FindUserByIdUseCase(userRepository);
			},
			inject: [USER_REPOSITORY],
		},
		{
			provide: UserTaskListsUsecase,
			useFactory: (
				taskListRepository: TaskListRepository,
				userRepository: UserRepository,
			) => {
				return new UserTaskListsUsecase(
					taskListRepository,
					userRepository,
				);
			},
			inject: [TASKLIST_REPOSITORY, USER_REPOSITORY],
		},
	],
	controllers: [UserController],
})
export class UserModule {}
