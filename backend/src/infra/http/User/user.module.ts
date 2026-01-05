import { CreateUserUseCase } from '@/application/useCases/createUser.usecase.ts/createUser.usecase';
import {
	USER_REPOSITORY,
	UserRepository,
} from '@/domain/repositories/User.repository';
import {
	PASSWORD_HASHER,
	PasswordHasher,
} from '@/domain/User/ports/passwordHasher';
import { MongooseUserModule } from '@/infra/database/mongoose/modules/mongoose-user.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { BcryptModule } from '@/infra/services/bcrypt.module';
import { ListUsersUseCase } from '@/application/useCases/listUsers.usecase.ts/listUsers.usecase';

@Module({
	imports: [MongooseUserModule, BcryptModule],
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
	],
	controllers: [UserController],
})
export class UserModule {}
