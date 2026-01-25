import { PasswordHasher } from '@/domain/modules/User/ports/passwordHasher';
import { UserRepository } from '@/domain/modules/User/user.repository';
import { RegisterInput, RegisterOutput } from './register.dto';
import { User } from '@/domain/modules/User/user.entity';
import { Password } from '@/domain/modules/User/values-objects/passwordHash.vo';
import { Email } from '@/domain/modules/User/values-objects/email.vo';
import { UserAlreadyExists } from '@/application/shared/usecase.error';
import { Authenticator } from '@/domain/modules/User/ports/authenticator';

export class RegisterUseCase {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
		private authenticator: Authenticator,
	) {}

	async execute(input: RegisterInput): Promise<RegisterOutput> {
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

		const payload = { sub: newUser.Id, email: newUser.Email };

		const [accessToken, refreshToken] =
			await this.authenticator.sign(payload);

		return {
			user: {
				id: newUser.Id,
				name: newUser.Name,
				email: newUser.Email,
			},
			accessToken,
			refreshToken,
		};
	}
}
