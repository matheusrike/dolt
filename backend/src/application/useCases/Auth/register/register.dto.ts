export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type RegisterOutput = {
	user: {
		id: string;
		name: string;
		email: string;
	};
	accessToken: string;
	refreshToken: string;
};
