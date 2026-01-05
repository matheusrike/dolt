import { PASSWORD_HASHER } from '@/domain/User/ports/passwordHasher';
import { Module } from '@nestjs/common';
import { BcryptPasswordHasher } from './bcrypt.service';

@Module({
	providers: [
		{
			provide: PASSWORD_HASHER,
			useClass: BcryptPasswordHasher,
		},
	],
	exports: [PASSWORD_HASHER],
})
export class BcryptModule {}
