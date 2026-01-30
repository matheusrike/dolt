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

	// Cria o access token e o refresh token
	async sign(payload: { sub: string; email: string }) {
		const ACCESS_TOKEN_EXPIRES_IN = 15 * 60;
		const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60;

		// Cria o access token com a expiração de 15 minutos
		const accessToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
			expiresIn: ACCESS_TOKEN_EXPIRES_IN,
		});

		// Cria o refresh token com a expiração de 7 dias
		const refreshToken = await this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
			expiresIn: REFRESH_TOKEN_EXPIRES_IN,
		});

		return {
			accessToken,
			refreshToken,
			refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
		};
	}
}
