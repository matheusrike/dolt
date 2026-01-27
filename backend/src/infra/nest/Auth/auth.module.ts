import { Module } from '@nestjs/common';
import { UserModule } from '../User/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from '@/application/useCases/Auth/register/register.usecase';
import { BcryptModule } from '@/infra/services/bcrypt.module';
import { UserRepository } from '@/domain/modules/User/user.repository';
import { Authenticator } from '@/domain/modules/User/ports/authenticator';
import { PasswordHasher } from '@/domain/modules/User/ports/passwordHasher';
import { RefreshTokenRepository } from './refreshToken.repository';
import { MongooseUserModule } from '@/infra/database/mongoose/modules/mongoose-user.module';
import { AuthService } from './auth.service';
import { MongooseRefreshTokenModule } from '@/infra/database/mongoose/modules/mongoose-refreshToken.module';

@Module({
	imports: [
		MongooseUserModule,
		UserModule,
		PassportModule,
		BcryptModule,
		MongooseRefreshTokenModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: configService.get('JWT_EXPIRES_IN'),
				},
			}),
		}),
	],

	providers: [
		{
			provide: Authenticator,
			useClass: AuthService,
		},
		{
			provide: RegisterUseCase,
			useFactory: (
				userRepository: UserRepository,
				passwordHasher: PasswordHasher,
				authenticator: Authenticator,
				refreshTokenRepository: RefreshTokenRepository,
			) => {
				return new RegisterUseCase(
					userRepository,
					passwordHasher,
					authenticator,
					refreshTokenRepository,
				);
			},
			inject: [
				UserRepository,
				PasswordHasher,
				Authenticator,
				RefreshTokenRepository,
			],
		},
	],
	controllers: [AuthController],
})
export class AuthModule {}
