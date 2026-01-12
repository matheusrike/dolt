export class UsecaseError extends Error {
	constructor(message?: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class UserAlreadyExists extends UsecaseError {}
export class UserNotFound extends UsecaseError {}
export class TaskListNotFound extends UsecaseError {}
