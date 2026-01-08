export type CreateTaskListInput = {
	userId: string;
	name: string;
};

export type CreateTaskListOutput = {
	id: string;
	name: string;
	createdAt: Date;
};
