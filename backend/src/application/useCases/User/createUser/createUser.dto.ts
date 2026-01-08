export type CreateUserInput = {
	name: string;
	email: string;
	password: string;
};

export type CreateUserOutput = {
	userId: string;
	name: string;
	email: string;
};
