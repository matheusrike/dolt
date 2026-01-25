export abstract class Authenticator {
	abstract sign(payload: {
		sub: string;
		email: string;
	}): Promise<[string, string]>;
}
