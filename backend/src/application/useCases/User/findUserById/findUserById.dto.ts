export type FindUserByIdInput = {
	id: string;
};

export class FindUserByIdOutput {
	name: string;
	email: string;
	isActive: boolean;
}
