import { InvalidUserName } from './user.error';
import { Email } from './values-objects/email.vo';
import { Password } from './values-objects/passwordHash.vo';

export interface UserProps {
	readonly id: string;
	name: string;
	email: Email;
	passwordHash: Password;
	isActive: boolean;
}

export interface CreateUserProps {
	name: string;
	email: Email;
	passwordHash: Password;
}

export class User {
	private constructor(private userProps: UserProps) {}

	static create(props: CreateUserProps): User {
		const id = crypto.randomUUID();
		if (!props.name || props.name.trim().length === 0) {
			throw new InvalidUserName('Name property cannot be null');
		}
		return new User({ ...props, id, isActive: true });
	}

	static restore(values: UserProps): User | null {
		return new User(values);
	}

	public changePassword(newPassword: Password): void {
		this.userProps.passwordHash = newPassword;
	}

	public changeEmail(newEmail: Email): void {
		this.userProps.email = newEmail;
	}

	public changeActive(newActivationStatus: boolean): void {
		this.userProps.isActive = newActivationStatus;
	}

	public get Id(): string {
		return this.userProps.id;
	}

	public get Name(): string {
		return this.userProps.name;
	}

	public get Email(): string {
		return this.userProps.email.getValue();
	}

	public get PasswordHash(): string {
		return this.userProps.passwordHash.getHash();
	}

	public get isActive(): boolean {
		return this.userProps.isActive;
	}
}
