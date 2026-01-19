import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type jwtToken = {
	type: 'access' | 'refresh';
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		// Recebe configService por injeção de dependência
		private readonly configService: ConfigService,
	) {
		// Configurações da estrategia de jwt do passport
		super({
			// Extrai o token do cabeçalho 'Authorization' da requisição
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// Define se deve ou não ignorar a expiração do token
			ignoreExpiration: false,
			// Valida a assinatura do token de acordo com a chave secreta
			secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
		});
	}

	// Valida o access token e o torna disponível no request (req.user)
	validate(payload: jwtToken) {
		if (payload.type !== 'access') throw new UnauthorizedException();
		return payload;
	}
}
