import { InvalidPassword } from '../errors/user.error';
import { PasswordHasher } from '../ports/passwordHasher';

export class Password {
	private constructor(private readonly hashed: string) {}

	public static async create(password: string, hasher: PasswordHasher) {
		if (!this.isStrong(password)) {
			throw new InvalidPassword(`Invalid Password`);
		}

		const hashed = await hasher.hash(password);

		return new Password(hashed);
	}

	public static fromHash(hashed: string) {
		return new Password(hashed);
	}

	public getHash() {
		return this.hashed;
	}

	private static isStrong(password: string) {
		/*
			- Has minimum 8 characters in length. Adjust it by modifying {8,}
    		- At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
    		- At least one lowercase English letter.  You can remove this condition by removing (?=.*?[a-z])
    	 	- At least one digit. You can remove this condition by removing (?=.*?[0-9])
    		- At least one special character,  You can remove this condition by removing (?=.*?[#?!@$%^&*-])
		*/
		const passwordRegex =
			/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

		return passwordRegex.test(password);
	}
}
