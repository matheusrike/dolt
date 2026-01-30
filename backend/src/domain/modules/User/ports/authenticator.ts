export abstract class Authenticator {
	abstract sign(payload: { sub: string; email: string }): Promise<{
		accessToken: string;
		refreshToken: string;
		refreshTokenExpiresIn: number;
	}>;
}
