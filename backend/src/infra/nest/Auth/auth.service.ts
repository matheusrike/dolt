import { Authenticator } from '@/domain/modules/User/ports/authenticator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class AuthService implements Authenticator {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}
	async sign(payload: {
		sub: string;
		email: string;
	}): Promise<[string, string]> {
		return await Promise.all([
			this.jwtService.signAsync(payload),
			this.jwtService.signAsync(payload, {
				secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
				expiresIn: this.configService.get<number>(
					'JWT_REFRESH_EXPIRES_IN',
				),
			}),
		]);
	}
}
