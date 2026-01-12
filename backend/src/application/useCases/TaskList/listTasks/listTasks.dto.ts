export type ListTasksInput = {
	taskListId: string;
};

export type ListTasksOutput = {
	id: string;
	title: string;
	description?: string;
}[];
