export interface PasswordHasher {
	hash(password: string): Promise<string> | string;
	compare(
		password: string,
		passwordHashed: string,
	): Promise<boolean> | boolean;
}

export const PASSWORD_HASHER = Symbol('PasswordHasher');

export const PasswordHasherToken = () => PASSWORD_HASHER;
