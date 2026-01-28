export abstract class RefreshTokenRepository {
	abstract save(data: {
		userId: string;
		token: string;
		expiresAt: Date;
	}): Promise<void> | void;
	abstract findByToken(token: string): Promise<string | null> | string | null;
}
