import { PasswordHasher } from '@/domain/modules/User/ports/passwordHasher';

export class FakePasswordHasher implements PasswordHasher {
	hash(value: string): string {
		return `hashed-${value}`;
	}

	compare(value: string, hash: string): boolean {
		return hash === `hashed-${value}`;
	}
}
