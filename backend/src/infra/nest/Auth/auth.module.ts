import { Module } from '@nestjs/common';
import { UserModule } from '../User/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from '@/application/useCases/Auth/register/register.usecase';

@Module({
	imports: [
		UserModule,
		PassportModule,
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
	controllers: [AuthController],
	providers: [RegisterUseCase],
})
export class AuthModule {}
