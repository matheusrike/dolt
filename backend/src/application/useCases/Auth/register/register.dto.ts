export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type RegisterOutput = {
	user: {
		sub: string;
		name: string;
		email: string;
	};
	accessToken: string;
	refreshToken: string;
};
