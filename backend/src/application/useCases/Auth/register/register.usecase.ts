import { PasswordHasher } from '@/domain/modules/User/ports/passwordHasher';
import { UserRepository } from '@/domain/modules/User/user.repository';
import { RegisterInput, RegisterOutput } from './register.dto';
import { User } from '@/domain/modules/User/user.entity';
import { Password } from '@/domain/modules/User/values-objects/passwordHash.vo';
import { Email } from '@/domain/modules/User/values-objects/email.vo';
import { UserAlreadyExists } from '@/application/shared/usecase.error';
import { Authenticator } from '@/domain/modules/User/ports/authenticator';
import { RefreshTokenRepository } from '@/infra/nest/Auth/refreshToken.repository';

export class RegisterUseCase {
	constructor(
		private userRepository: UserRepository,
		private passwordHasher: PasswordHasher,
		private authenticator: Authenticator,
		private refreshTokenRepository: RefreshTokenRepository,
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

		const payload = { sub: newUser.Id, email: newUser.Email };

		const { accessToken, refreshToken } =
			await this.authenticator.sign(payload);

		const expiresInSeconds = 60 * 60 * 24 * 7; // 7 days

		const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
		await this.refreshTokenRepository.save({
			userId: newUser.Id,
			token: refreshToken,
			expiresAt,
		});
		await this.userRepository.save(newUser);

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
