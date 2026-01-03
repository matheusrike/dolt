export interface PasswordHasher {
	hash(password: string): Promise<string> | string;
	compare(
		password: string,
		passwordHashed: string,
	): Promise<boolean> | boolean;
}
