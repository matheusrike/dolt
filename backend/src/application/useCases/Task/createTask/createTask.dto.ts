export type CreateTaskInput = {
	taskListId: string;
	title: string;
	description?: string;
};

export type CreateTaskOutput = {
	id: string;
	title: string;
	description?: string;
};
