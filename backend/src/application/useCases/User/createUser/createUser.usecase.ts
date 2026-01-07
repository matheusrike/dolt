import { PasswordHasher } from '@/domain/User/ports/passwordHasher';
import { UserRepository } from '@domain/repositories/User.repository';
import { CreateUserInput } from './createUser.dto';
import { User } from '@/domain/User/entities/user.entity';
import { Password } from '@/domain/User/values-objects/passwordHash.vo';
import { Email } from '@/domain/User/values-objects/email.vo';

export class CreateUserUseCase {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
	) {}

	async execute(
		input: CreateUserInput,
	): Promise<{ userId: string; userName: string }> {
		const passwordHash = await Password.create(
			input.password,
			this.passwordHasher,
		);
		const email = Email.create(input.email);

		if (await this.userRepository.findByEmail(email)) {
			throw new Error('User already exists');
		}

		const newUser = User.create({
			name: input.name,
			email,
			passwordHash,
		});

		await this.userRepository.save(newUser);
		return { userId: newUser.Id, userName: newUser.Name };
	}
}
