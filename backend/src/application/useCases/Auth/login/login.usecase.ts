import { UserRepository } from '@/domain/modules/User/user.repository';
import { LoginInput, LoginOutput } from './login.dto';
import { Email } from '@/domain/modules/User/values-objects/email.vo';
import { UserNotFound } from '@/application/shared/usecase.error';
import { Authenticator } from '@/domain/modules/User/ports/authenticator';
import { RefreshTokenRepository } from '@/infra/nest/Auth/refreshToken.repository';

export class LoginUseCase {
	constructor(
		private userRepository: UserRepository,
		private authenticator: Authenticator,
		private refreshTokenRepository: RefreshTokenRepository,
	) {}

	async execute(input: LoginInput): Promise<LoginOutput> {
		const email = Email.create(input.email);

		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new UserNotFound('User not found');
		}

		const payload = { sub: user.Id, name: user.Name, email: user.Email };

		const { accessToken, refreshToken, refreshTokenExpiresIn } =
			await this.authenticator.sign(payload);

		await this.refreshTokenRepository.save({
			userId: user.Id,
			token: refreshToken,
			expiresAt: new Date(Date.now() + refreshTokenExpiresIn * 1000),
		});

		return {
			accessToken,
			refreshToken,
		};
	}
}
