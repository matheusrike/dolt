import { User } from '@/domain/modules/User/user.entity';
import type { UserRepository } from '@/domain/modules/User/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type JwtPayload = {
	sub: string;
	email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { sub: userId } = payload;

		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		return user;
	}
}
