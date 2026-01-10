import { PasswordHasher } from '@/domain/modules/User/ports/passwordHasher';
import { UserRepository } from '@/domain/modules/User/user.repository';
import { CreateUserInput, CreateUserOutput } from './createUser.dto';
import { User } from '@/domain/modules/User/user.entity';
import { Password } from '@/domain/modules/User/values-objects/passwordHash.vo';
import { Email } from '@/domain/modules/User/values-objects/email.vo';
import { UserAlreadyExists } from '../user-usecase.error';

export class CreateUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
	) {}

	async execute(input: CreateUserInput): Promise<CreateUserOutput> {
		const passwordHash = await Password.create(
			input.password,
			this.passwordHasher,
		);
		const email = Email.create(input.email);

		if (await this.userRepository.findByEmail(email)) {
			throw new UserAlreadyExists('User already exists');
		}

		const newUser = User.create({
			name: input.name,
			email,
			passwordHash,
		});

		await this.userRepository.save(newUser);
		return { userId: newUser.Id, name: newUser.Name, email: newUser.Email };
	}
}
