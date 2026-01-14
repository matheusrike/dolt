import { Module } from '@nestjs/common';
import { UserModule } from '../User/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_ACCESS_SECRET'),
				signOptions: {
					expiresIn: configService.get('JWT_ACCESS_EXPIRATION'),
				},
			}),
		}),
	],
})
export class AuthModule {}
