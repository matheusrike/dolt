export class CreateTaskListInput {
	userId: string;
	name: string;
}

export class CreateTaskListOutput {
	id: string;
	name: string;
	createdAt: Date;
}
