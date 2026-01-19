export abstract class PasswordHasher {
	abstract hash(password: string): Promise<string> | string;
	abstract compare(
		password: string,
		passwordHashed: string,
	): Promise<boolean> | boolean;
}
