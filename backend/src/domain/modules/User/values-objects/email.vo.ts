import { InvalidEmail } from '../user.errors';

export class Email {
	private constructor(private readonly email: string) {}

	static create(email: string): Email {
		if (this.isValid(email)) {
			return new Email(email.toLowerCase());
		}

		throw new InvalidEmail(`Invalid e-mail`);
	}

	private static isValid(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	public getValue() {
		return this.email;
	}

	public compare(otherEmail: Email) {
		return this.email === otherEmail.email;
	}
}
