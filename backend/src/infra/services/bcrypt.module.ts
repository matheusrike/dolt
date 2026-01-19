import { PasswordHasher } from '@/domain/modules/User/ports/passwordHasher';
import { Module } from '@nestjs/common';
import { BcryptPasswordHasher } from './bcrypt.service';

@Module({
	providers: [
		{
			provide: PasswordHasher,
			useClass: BcryptPasswordHasher,
		},
	],
	exports: [PasswordHasher],
})
export class BcryptModule {}
