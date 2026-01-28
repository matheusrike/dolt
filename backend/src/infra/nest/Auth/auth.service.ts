import { Authenticator } from '@/domain/modules/User/ports/authenticator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements Authenticator {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}
	async sign(payload: { sub: string; email: string }) {
		const accessToken = await this.jwtService.signAsync(payload);

		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
			expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
		});

		return {
			accessToken,
			refreshToken,
		};
	}
}
