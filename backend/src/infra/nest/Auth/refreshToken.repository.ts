export abstract class RefreshTokenRepository {
	abstract save(data: string): Promise<void> | void;
	abstract findByToken(token: string): Promise<string | null> | string | null;
}
