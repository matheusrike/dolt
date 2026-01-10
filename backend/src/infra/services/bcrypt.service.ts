import bcrypt from 'bcryptjs';
import { PasswordHasher } from '@/domain/modules/User/ports/passwordHasher';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
	private readonly saltRounds = 12;

	async hash(value: string): Promise<string> {
		return await bcrypt.hash(value, this.saltRounds);
	}

	async compare(value: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(value, hash);
	}
}
