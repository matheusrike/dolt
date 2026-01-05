import { User } from '@/domain/User/entities/user.entity';
import { Email } from '@/domain/User/values-objects/email.vo';
import { UserRepository } from '@domain/repositories/User.repository';

export class InMemoryUserRepository implements UserRepository {
	private usersList = new Map<string, User>();

	save(user: User): void {
		const id = user.Id;
		this.usersList.set(id, user);
	}

	findById(id: string): Promise<User> | User {
		const user = this.usersList.get(id);
		if (!user) throw new Error('User not found');
		return user;
	}

	findByEmail(email: Email): User {
		for (const user of this.usersList.values()) {
			if (user.Email === email.getValue()) return user;
		}
		throw new Error('User not found');
	}

	list(): Promise<User[]> | User[] {
		return Array.from(this.usersList.values());
	}
}
